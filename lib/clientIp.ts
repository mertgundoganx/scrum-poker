/**
 * The client address for rate limiting.
 *
 * Production traffic comes through Cloudflare, which names the visitor in
 * CF-Connecting-IP, then through our own proxy, which appends the address it
 * got the request from to X-Forwarded-For (the entries before it are
 * client-controlled). CF-Connecting-IP is believed only when that last hop is
 * Cloudflare (or an internal address, when nothing else is known): if the
 * origin is reached around Cloudflare, anyone could put any address there and
 * slip past every limit.
 *
 * IPv6 addresses count per /64: one connection usually gets a whole /64, so
 * counting single addresses would hand everyone billions of them.
 */

const CLOUDFLARE_V4 = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
];
const CLOUDFLARE_V6 = [
  '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
  '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32',
];

function v4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p) || Number(p) > 255) return null;
    n = n * 256 + Number(p);
  }
  return n;
}

/** The 8 groups of an IPv6 address as numbers, or null. */
function v6Groups(ip: string): number[] | null {
  if (!/^[0-9a-f:]+$/i.test(ip) || ip.split('::').length > 2) return null;
  const [head, tail] = ip.split('::');
  const a = head ? head.split(':') : [];
  const b = tail !== undefined && tail ? tail.split(':') : [];
  const missing = 8 - a.length - b.length;
  if (tail === undefined ? missing !== 0 : missing < 1) return null;
  const groups = [...a, ...Array(tail === undefined ? 0 : missing).fill('0'), ...b];
  if (groups.some(g => !/^[0-9a-f]{1,4}$/i.test(g))) return null;
  return groups.map(g => parseInt(g, 16));
}

/** "::ffff:1.2.3.4" is the IPv4 address 1.2.3.4. */
function unmapV4(ip: string): string {
  const m = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  return m ? m[1] : ip;
}

function inRange(ip: string, cidr: string): boolean {
  const [base, bitsStr] = cidr.split('/');
  const bits = Number(bitsStr);
  if (base.includes(':')) {
    const g = v6Groups(ip);
    const b = v6Groups(base);
    if (!g || !b) return false;
    for (let i = 0; i < 8 && bits > i * 16; i++) {
      const take = Math.min(16, bits - i * 16);
      const mask = (0xffff << (16 - take)) & 0xffff;
      if ((g[i] & mask) !== (b[i] & mask)) return false;
    }
    return true;
  }
  const n = v4ToInt(ip);
  const b = v4ToInt(base);
  if (n === null || b === null) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return ((n & mask) >>> 0) === ((b & mask) >>> 0);
}

function isCloudflare(ip: string): boolean {
  return (ip.includes(':') ? CLOUDFLARE_V6 : CLOUDFLARE_V4).some(c => inRange(ip, c));
}

/** Loopback, private and link-local addresses: our own network. */
function isInternal(ip: string): boolean {
  if (ip.includes(':')) {
    return ip === '::1' || ['fc00::/7', 'fe80::/10'].some(c => inRange(ip, c));
  }
  return ['127.0.0.0/8', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'].some(c => inRange(ip, c));
}

/** One key per IPv4 address, one per IPv6 /64. */
function rateKey(ip: string): string {
  if (!ip.includes(':')) return ip;
  const g = v6Groups(ip);
  return g ? `${g.slice(0, 4).map(x => x.toString(16)).join(':')}::/64` : ip;
}

/**
 * The network around a rate key: an IPv4 /24 or an IPv6 /48 (what one site or
 * provider customer usually gets), for the few limits that a block of
 * addresses must not multiply.
 */
export function networkKey(key: string): string {
  if (key.endsWith('::/64')) {
    const groups = key.slice(0, -'::/64'.length).split(':');
    return `${groups.slice(0, 3).join(':')}::/48`;
  }
  const v4 = key.split('.');
  return v4.length === 4 ? `${v4.slice(0, 3).join('.')}.0/24` : key;
}

export function getClientIp(headers: Pick<Headers, 'get'>): string {
  const forwarded = headers.get('x-forwarded-for');
  const hop = forwarded?.split(',').at(-1)?.trim() || headers.get('x-real-ip')?.trim() || '';
  const peer = unmapV4(hop);
  const cf = unmapV4(headers.get('cf-connecting-ip')?.trim() ?? '');
  if (cf && (!peer || isCloudflare(peer) || isInternal(peer))) return rateKey(cf);
  return peer ? rateKey(peer) : 'unknown';
}
