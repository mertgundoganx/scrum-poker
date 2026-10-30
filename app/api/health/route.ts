// Health check for Shipwick (health.path in shipwick.yaml): answers 200 once
// the server takes requests. It deliberately checks nothing else, so a Redis
// outage does not get healthy replicas replaced.
export function GET() {
  return Response.json({ ok: true });
}
