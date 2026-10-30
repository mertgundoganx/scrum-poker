import type { LegalContent } from '@/app/ContentPage';

const en: LegalContent = {
  title: 'Terms of Service',
  updated: 'Last updated: October 30, 2026',
  intro: 'These terms apply to your use of Scrum Poker Online at scrumpokerplay.com ("the Service"). The Service is run by Mert Gündoğan, a private individual in Türkiye ("we", "us"). Contact: contact@scrumpokerplay.com. By using the Service you accept these terms. If you do not accept them, do not use the Service. How we handle personal data is explained in the Privacy Policy: https://www.scrumpokerplay.com/privacy.',
  sections: [
    {
      title: '1. The Service',
      content: 'Scrum Poker Online is an online planning poker tool for estimating work with your team. There are no accounts. The Service is currently free of charge: there are no paid plans, subscriptions or payments. If we add paid features, they may come with their own terms.',
    },
    {
      title: '2. Who can use it',
      content: 'You must be at least 16 years old to use the Service.',
    },
    {
      title: '3. Rooms',
      items: [
        'Anyone who has a room\'s code or link can join that room, unless the host has closed it to new people. They can see its participants, stories, revealed votes and chat, and take part. A room code is not a password: share it only with the people you want in the room.',
        'By default, every participant can reveal votes, start a new round, manage the story queue and use the timer. The host can also change the deck and the room settings (automatic reveal, anonymous voting, letting only the host run the round, closing the room to new people, emoji reactions, an issue-link address), remove participants and hand the host role to someone else. Someone who was removed cannot rejoin that room from the same browser while the room exists, unless they are a kept room\'s owner, whose owner link lets them back in.',
        'The person who creates a room is its first host. If the host leaves, the role passes to another participant. An owner who opens a kept room with its owner link takes the host role from a host who does not have the owner key.',
        'Rooms are temporary. A room and its content are normally deleted about one hour after it becomes empty (about ten minutes if nothing was ever done in it). A kept room (section 4) keeps only its setup, story queue and last results.',
      ],
    },
    {
      title: '4. Kept rooms and owner links',
      items: [
        'The host can keep a room. Its setup (code, name, deck and settings), its story queue and the results of its last rounds (story and agreed estimate) then remain, and opening the room\'s link later brings it back.',
        'Keeping a room creates a secret owner link. Keep it private: anyone who has it controls the room. They take the host role and can stop keeping the room.',
        'The browser that kept the room remembers the owner link. Copy it if you want to use it on another device. There are no accounts, so we cannot recover a lost owner link.',
        'A kept room is normally removed when its owner stops keeping it, or automatically 180 days after its owner last came back with the owner link, or 30 days after it was kept if the owner never comes back with it. It can also be removed earlier (section 8). We may limit how many rooms can be kept.',
      ],
    },
    {
      title: '5. Your content and your responsibility',
      items: [
        'What you enter (names, room names, stories, links, votes, estimates, chat messages) remains yours. You give us only the permission needed to run the Service with it: to store and transmit it, as described in the Privacy Policy, and to show it to the other people in the room. They can also export the round history.',
        'You are responsible for what you enter. Do not enter confidential information, other people\'s personal data, or anything that is unlawful or that you are not allowed to share.',
        'We do not review content. We may remove content or rooms, and block or limit access, if we believe the rules in these terms are being broken, without notice.',
      ],
    },
    {
      title: '6. Acceptable use',
      content: 'Do not use the Service to break the law; to harass, threaten or impersonate others; to share unlawful, hateful or sexually explicit content or harmful links; to attack the Service or try to get unauthorized access; to scrape it or send automated traffic to it; to run load or stress tests against it; or to get around its limits or protections. We may block access that breaks these rules.',
    },
    {
      title: '7. Links to other sites',
      content: 'Rooms can contain links to other sites, for example issue-tracker links that participants add. We do not control or check these sites. Whoever adds a link is responsible for it, and you open such links at your own risk.',
    },
    {
      title: '8. Availability, data and changes to the Service',
      items: [
        'We do not promise that the Service will be available at any particular time or for any length of time, and we do not promise to keep any data or to make backups that you can rely on. Rooms and kept rooms may be deleted or lost at any time, for example after a technical failure.',
        'Keep your own copy of anything important. A room\'s round history can be downloaded as CSV, or copied as CSV or Markdown.',
        'We may change, suspend or end the Service, or any part or feature of it, at any time, without notice and, to the extent permitted by law, without liability.',
      ],
    },
    {
      title: '9. No warranty',
      content: 'To the extent permitted by law, the Service is provided "as is" and "as available", without warranties of any kind, express or implied. In particular, we do not promise that it is free of errors, secure, uninterrupted or suitable for any particular purpose.',
    },
    {
      title: '10. Limitation of liability',
      items: [
        'To the extent permitted by law, we are not liable for indirect, incidental, special or consequential damage, or for lost data, lost profits, lost time or business interruption.',
        'The Service is free. To the extent permitted by law, our total liability for all claims connected with the Service is therefore limited to the amount you paid us for it, which is zero.',
        'These limits do not apply where the law does not allow liability to be limited, in particular for damage caused intentionally or by gross negligence and for injury to life, body or health. Nothing in these terms limits the rights you have as a consumer under the mandatory law of your country.',
      ],
    },
    {
      title: '11. Support and notices',
      content: 'We have no obligation to provide support, answer questions or fix errors. You can send notices and questions to contact@scrumpokerplay.com. We give notices on this website.',
    },
    {
      title: '12. Changes to these terms',
      content: 'We may change these terms at any time. The current version, with its date, is always on this page. There are no accounts, so we do not notify anyone individually. If you keep using the Service after a change, you accept the new terms.',
    },
    {
      title: '13. Source code',
      content: 'The Service\'s source code is available under the GNU Affero General Public License, version 3, at https://github.com/mertgundoganx/scrum-poker. That license applies to the code; these terms apply to your use of the Service run at scrumpokerplay.com.',
    },
    {
      title: '14. Trademarks',
      content: 'Planning Poker® is a registered trademark of Mountain Goat Software, LLC. Scrum Poker Online is not affiliated with or endorsed by it.',
    },
    {
      title: '15. Final provisions',
      content: 'These terms are the entire agreement between you and us about the Service. If any part of them is invalid or cannot be enforced, the rest still applies. If we do not enforce a provision, we have not waived it.',
    },
    {
      title: '16. Contact',
      content: 'Questions about these terms: contact@scrumpokerplay.com',
    },
  ],
};

export default en;
