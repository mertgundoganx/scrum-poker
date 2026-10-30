import type { LegalContent } from '@/app/ContentPage';

const en: LegalContent = {
  title: 'Privacy Policy',
  updated: 'Last updated: October 30, 2026',
  intro: 'This policy explains what data Scrum Poker Online (scrumpokerplay.com, "the Service") processes, why, for how long and with whom. The Service is operated by Mert Gündoğan, a private individual in Türkiye ("we"), who is the controller responsible for the processing described here. Contact: contact@scrumpokerplay.com. Because the Service is also offered to people in the EU/EEA, the EU General Data Protection Regulation (GDPR) applies to it (Art. 3(2)), and so does Turkish data protection law (KVKK, section 8). The Service has no user accounts. Our Terms of Service are at https://www.scrumpokerplay.com/terms.',
  sections: [
    {
      title: '1. Data we process',
      items: [
        'There are no accounts: we do not ask for an e-mail address or a password, and there is no sign-in of any kind.',
        'In a room: the display name you choose (it does not have to be your real name), an optional emoji avatar, a random identifier your browser creates, and the room\'s content — room name, stories, votes and round history, final estimates, chat messages (the last 30 of each room) and the shared timer.',
        'What others in the room see: everyone in the room sees your name, avatar, whether you have voted, whether you are watching or away, your chat messages and your votes once they are revealed. The round history (each round\'s story and, unless the room is anonymous, who voted what) and the last 30 chat messages are also shown to people who join later while the room exists, and anyone in the room can download or copy the round history, including names and votes, as CSV or Markdown — we have no control over such copies. In an anonymous room the revealed cards are shown and kept without names. Emoji reactions and nudges (a nudge shows your name to the person nudged) are shown live and never stored. The room also stores the random identifiers of the host, of the people the host removed and of a kept room\'s owners.',
        'Kept rooms: if the host keeps a room, we store its code, name, deck (including custom cards) and settings (auto-reveal, anonymous voting, letting only the host run the round, reactions on or off, and the issue-link address pattern the host enters), its story queue, the results of its last rounds (up to 50; for each, only the story text, the agreed estimate and when the round ended — no names, no individual votes), a SHA-256 hash of its owner key (never the key itself) and when it was kept. This normally contains no personal data, unless someone types it into the room name or the stories, and we do not link a kept room to any person.',
        'IP address: we use your IP address to limit abuse (rate limiting, and limits on how many rooms and connections one address can have open). These records are kept only in the server\'s memory and are never written to the database or its backups. Your IP address also appears in the reverse proxy\'s access log (see Logs).',
        'Logs: the application\'s logs record events (a room being created, someone joining or being removed) with the room code and the random identifier, but not IP addresses or room content. The reverse proxy in front of the application (Caddy, run by our deployment tool on the same server) logs each request: the time, host, method, path without the query string, status, duration, size and your IP address.',
        'Visit statistics: the script of Cloudflare Web Analytics (static.cloudflareinsights.com) sends the page address, the referring page, your browser type and page-load timings to Cloudflare, which receives your IP address with that request. It sets no cookie and stores nothing on your device; we see only aggregated figures (pages, countries, browsers), and no profile of you is built.',
        'E-mail: if you write to contact@scrumpokerplay.com, Cloudflare Email Routing forwards your message to our mailbox at Microsoft Outlook (Microsoft Corporation, USA), which Microsoft provides under its own terms as its own controller, not on our behalf. We process your e-mail address and your message only to answer you.',
      ],
    },
    {
      title: '2. On your device',
      items: [
        'Cookies: we set one kind of cookie ourselves — a signed room cookie for each room you join. It is sent only to that room\'s API and contains your random identifier, the room code and an expiry time; it is valid for 2 hours and renewed while you use the room. In addition, Cloudflare\'s bot protection may run a short automatic check in your browser and set security cookies for scrumpokerplay.com, such as cf_clearance (valid for up to one year), used only to tell browsers from automated traffic. Cloudflare may also ask your browser to report network errors to Cloudflare (Network Error Logging); your browser keeps this instruction for up to 7 days. We set no other cookies.',
        'These cookies and the browser storage described below are strictly necessary to provide the Service you ask for, to keep it secure, or to remember settings you chose, so they need no consent (Art. 5(3) of the ePrivacy Directive; in Germany § 25(2) No. 2 TDDDG). That is why there is no cookie banner.',
        'Local storage in your browser: your language, if you chose one; your theme and sound settings; your display name, avatar and random identifier; up to 5 rooms you opened recently (code, name and when you opened them); the owner keys, codes and names of up to 50 rooms kept in this browser; whether you dismissed the room tip; and, for each room, a short list of your open tabs, so that closing one tab does not take you out of the room.',
        'Session storage: the language of the last page you read, so that a room you open from it starts in that language; a note that this tab has already been switched to your browser\'s language once; and, only for a moment while an owner link is being opened, its owner key.',
        'Offline use: the service worker stores pages (never room pages) and static files in your browser so that the site also works offline.',
        'Local storage and the service worker\'s files stay on your device until you clear the site\'s data in your browser; session storage is cleared when you close the tab, and a room\'s list of open tabs when its last tab is closed. Your name, avatar and identifier are sent to us only when you create or join a room (the identifier also inside the room cookie, with each action in that room), and an owner key only to prove that you own a kept room.',
      ],
    },
    {
      title: '3. Why we process data (legal bases)',
      items: [
        'To provide the Service you ask for — rooms and kept rooms: performance of a contract (GDPR Art. 6(1)(b)).',
        'What is required: to take part in a room you need a display name (any name; it does not have to be your real name), and your browser needs the random identifier and the room cookie. Without them the room cannot work. Nothing else is required.',
        'To keep the Service secure and available — rate limiting, abuse and bot protection, logs and backups: our legitimate interest (GDPR Art. 6(1)(f)) in a service that works and is not abused.',
        'Visit statistics, to understand which pages are used: our legitimate interest (GDPR Art. 6(1)(f)); no profile of you is built.',
        'Answering your e-mails: our legitimate interest (GDPR Art. 6(1)(f)).',
        'We make no decisions based solely on automated processing that have legal or similarly significant effects on you (GDPR Art. 22); automatic rate limits only delay or refuse excessive requests.',
      ],
    },
    {
      title: '4. How long we keep it',
      items: [
        'Room content (names, avatars, identifiers, stories, votes and round history, final estimates, chat, timer, and the identifiers of removed people and owners): deleted about one hour after the room becomes empty, or after about ten minutes if nothing was ever done in it. The database\'s change log on disk can still contain it until the log is next compacted, at the latest before the next daily backup. Only the last 30 chat messages of a room are kept at any time.',
        'Kept rooms: until their owner stops keeping them, or automatically 180 days after their owner last came back with the owner link — or 30 days after the room was kept, if the owner never comes back with it; other people opening the room do not extend this period. A kept room can also be removed earlier, for example if the server runs out of memory.',
        'IP addresses for rate limiting: only in the server\'s memory, removed once their time window has passed (normally within about an hour of the last request) and whenever the application restarts. Which address opened a room that is still live: in memory until that room is deleted. The counts of open connections per address: only while the connections are open.',
        'Logs: the application\'s logs are rotated by size — at most five files of 10 MB each are kept, and the oldest is overwritten; when the application is redeployed, a copy of the replaced instance\'s last lines (up to 2,000 lines) is kept for 14 days. The reverse proxy\'s access log is kept in files capped at 3 × 10 MB, the oldest being overwritten; aggregated per-minute counts without IP addresses are kept for 7 days.',
        'E-mails: kept as long as we need them to answer you and deal with any follow-up, normally no longer than 12 months after the conversation ends, unless we need them to establish, exercise or defend legal claims.',
        'Backups: the database is backed up once a day, and each backup is kept for 7 days, on the same server. Before each backup the database\'s change log is compacted, so a backup holds what was in the database at that moment. Room content, chat and kept rooms present at backup time can therefore remain in a backup for up to 7 more days. Backups are used only to restore the Service after a failure.',
      ],
    },
    {
      title: '5. Where data is stored and which providers are involved',
      items: [
        'Everything the Service stores — a single Redis database, its backups and the logs — is on our server at Hetzner, in its data center in Helsinki, Finland. E-mails to us are kept in our mailbox at Microsoft Outlook.',
        'Hetzner Online GmbH (Germany): our server, with the database, its backups and the logs, in its data center in Helsinki, Finland.',
        'Cloudflare, Inc. (USA): all traffic passes through Cloudflare\'s network — normally the data center nearest to you, which can be outside the EU — for DNS, encryption (TLS), protection against bots and attacks, e-mail forwarding and Web Analytics. Because Cloudflare terminates the encrypted connection, it processes all traffic on our behalf, including IP addresses and room content in transit; it does not store room content.',
        'Microsoft Corporation (USA): provides our mailbox at Microsoft Outlook, which receives the messages sent to contact@scrumpokerplay.com, under its own terms; for this mailbox Microsoft is its own controller, not a processor acting on our behalf.',
        'Transfers outside the EU: Cloudflare and Microsoft are certified under the EU-U.S. Data Privacy Framework (https://www.dataprivacyframework.gov); Cloudflare\'s Data Processing Addendum, which includes the EU Standard Contractual Clauses, is at https://www.cloudflare.com/cloudflare-customer-dpa/. We operate the Service from Türkiye, for which there is no EU adequacy decision; when we administer the server, we access the data from there. Hetzner and Cloudflare process data only on our behalf, to provide their service to us.',
      ],
    },
    {
      title: '6. Your rights',
      items: [
        'You can ask to access, correct, export or delete your personal data, to restrict its processing, and to know who it was shared with (GDPR Art. 15–20). Write to contact@scrumpokerplay.com and we will answer within one month (GDPR Art. 12(3); for complex requests up to two more months, and we will tell you). Because there are no accounts and room data is gone about an hour after a room empties, we usually hold nothing we can link to you; please tell us the room code, roughly when you used it and your display name.',
        'You also have the right to lodge a complaint with a supervisory authority, in particular in the EU/EEA country where you live or work.',
      ],
    },
    {
      title: '7. Your right to object',
      content: 'You may object at any time, on grounds relating to your particular situation, to processing based on our legitimate interests (security, rate limiting and bot protection, logs and backups, visit statistics, answering e-mails) (GDPR Art. 21). Write to contact@scrumpokerplay.com; we will then stop that processing unless we have compelling legitimate grounds for it that override your interests, rights and freedoms, or need it to establish, exercise or defend legal claims.',
    },
    {
      title: '8. Turkish law (KVKK)',
      items: [
        'Because we are based in Türkiye, the Personal Data Protection Law No. 6698 (KVKK) also applies. As the data controller, we use this policy to inform you as KVKK Art. 10 requires.',
        'We collect the data described here electronically through the website, for the purposes in section 3 (KVKK Art. 5(2)(c): necessary for a contract, and (f): our legitimate interests). It is transferred abroad to Hetzner (Germany; server in Finland), Cloudflare and Microsoft (USA), as described in section 5.',
        'You have the rights in KVKK Art. 11: to learn whether your data is processed, to request information about it, to learn the purpose of the processing and whether the data is used for that purpose, to know the recipients in Türkiye or abroad, to request correction or deletion and that the recipients are told of it, to object to a result against you arising solely from automated analysis, and to claim compensation for damage caused by unlawful processing. Write to contact@scrumpokerplay.com; we will answer within 30 days at the latest (KVKK Art. 13).',
        'If we reject your application, do not answer in time or you find our answer insufficient, you can also complain to the Personal Data Protection Board (Kişisel Verileri Koruma Kurulu) (KVKK Art. 14).',
      ],
    },
    {
      title: '9. Security',
      content: 'We take reasonable technical measures to protect data. For example, connections are encrypted (TLS), owner keys of kept rooms are stored only as hashes, room cookies are signed and HttpOnly (scripts cannot read them), and the database is not reachable from the internet. No system is completely secure, and we cannot guarantee security. If a data breach happens, we will act as the law requires.',
    },
    {
      title: '10. Children',
      content: 'The Service is not directed at children under 16, and we do not knowingly collect their data. If you believe we hold data about a child, contact us so that we can delete it.',
    },
    {
      title: '11. Changes',
      content: 'We may change this policy. The current version, with its date, is always on this page. There are no accounts, so we do not notify anyone individually. Questions: contact@scrumpokerplay.com.',
    },
  ],
};

export default en;
