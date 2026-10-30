import type { LandingContent } from '@/app/landingTypes';

const en: LandingContent = {
  breadcrumb: 'Planning Poker Cards',
  title: 'Planning Poker Cards: Values, Decks & Printable vs Online',
  subtitle: 'What is printed on the cards, the standard decks teams use, what the special cards mean and how physical cards compare with an online deck.',
  sections: [
    {
      blocks: [
        { p: '**Planning poker cards** are the whole tool: a small deck of values that every estimator holds, picks from privately and reveals at the same moment as everyone else. The values are chosen so that a team can express relative effort without pretending to a precision it does not have. This page walks through what is on the cards, the standard decks, the meaning of the special cards, how physical and online cards differ, and how to choose a deck for your team.' },
      ],
    },
    {
      title: 'What is on a planning poker card',
      blocks: [
        { p: 'Each card carries a single value. In a numeric deck that is a story-point number; in a t-shirt deck it is a size label. A physical deck gives each participant one full set of cards so that everyone can vote independently, so a team of eight needs eight sets. In an online room the deck is shown on screen and each participant taps one card; the room handles hiding and revealing.' },
        { p: 'What a card does not carry is a unit. A 5 is not five hours or five days; it is five times a 1, where the 1 is whatever the team agreed to use as its smallest reference story. That is the whole point of relative estimation, and it is why the same deck works for teams with very different velocities. If the distinction is new to you, [What is planning poker?](/blog/what-is-planning-poker) and [story points vs hours](/blog/story-points-vs-hours) cover it in detail.' },
      ],
    },
    {
      title: 'Standard planning poker decks',
      blocks: [
        { p: 'A handful of decks cover nearly every team. Scrum Poker Online ships the Scrum, Fibonacci, T-Shirt and Powers of 2 decks and lets you build your own.' },
        {
          decks: [
            {
              title: 'Scrum (modified Fibonacci)',
              cards: '0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕',
              desc: 'Fibonacci up to 13, then rounded values that stress that large estimates are buckets, not measurements, plus a half-point card for trivial work. These are the values on most printed card sets.',
            },
            {
              title: 'Fibonacci',
              cards: '0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?, ☕',
              desc: 'The classic sequence. The gaps grow with the numbers, so large stories are estimated coarsely and small ones finely. Read the full [Fibonacci planning poker guide](/fibonacci-planning-poker).',
            },
            {
              title: 'T-Shirt sizes',
              cards: 'Z, T, XXS, XS, S, M, L, XL, XXL, XXXL, ?, ☕',
              desc: 'Relative labels instead of numbers. The classic set is XS to XXL; our deck adds Z (zero), T (tiny), XXS and XXXL at the extremes. Ideal for roadmaps, epics and non-engineering teams. See the [t-shirt sizing guide](/t-shirt-sizing).',
            },
            {
              title: 'Powers of 2',
              cards: '0, 1, 2, 4, 8, 16, 32, 64, 128, ?, ☕',
              desc: 'Each card doubles the last. The gaps are wider than Fibonacci, which pushes teams to split stories earlier and suits work with high uncertainty.',
            },
            {
              title: 'Custom',
              cards: '2 to 20 cards, up to 4 characters each',
              desc: 'Use it for a 1 to 5 scale, a three-card small / medium / large set, an hours-based deck if your organization insists on one, or anything else your process needs.',
            },
          ],
        },
      ],
    },
    {
      title: 'What the special cards mean',
      blocks: [
        { p: 'Every built-in deck in Scrum Poker Online includes two non-numeric cards (a custom deck holds only the cards you add), and many physical decks include a third.' },
        {
          ul: [
            '**?** means "I cannot estimate this." Not enough information, or the story is unclear. If several people play it, stop voting and clarify the scope. This is the most valuable card in the deck: it turns silent confusion into a visible signal.',
            '**☕** means "I need a break." Estimation quality drops sharply when people are tired. A coffee card is a polite way to say the session has gone on long enough.',
            '**∞ or "too big"** appears on many printed decks and means the story is beyond the top of the scale and must be split. Online, the same message is sent by playing the highest card, or by playing ? and saying why.',
          ],
        },
        { p: 'Some decks, like the Scrum deck, also carry a 0 and a ½. Zero means "no work" or "already done"; the half card is for tasks so small that even a 1 overstates them. Whether you use them is a team convention.' },
      ],
    },
    {
      title: 'Physical cards vs online cards',
      blocks: [
        { p: 'Printed decks were the original and still work well for teams who share a room. The comparison is mostly about logistics.' },
        {
          compare: [
            {
              title: 'Physical cards',
              items: [
                'Everyone needs a deck, and decks go missing. A team of ten needs ten complete sets on the table.',
                'Reveal discipline is manual. Someone counts down, and people occasionally peek.',
                'Nothing is recorded. Results are written on a whiteboard or typed into a tracker afterwards.',
                'No remote participants. A hybrid team ends up with one person voting by chat message.',
              ],
            },
            {
              title: 'Online cards',
              items: [
                'Hidden until reveal. Votes are invisible to everyone, including the facilitator, until the round is revealed.',
                'Works for remote and hybrid teams. Share a link or scan a QR code and the whole team is in the same room.',
                'Automatic analysis: vote distribution, min, median, average and max, consensus detection and a suggested estimate the moment the cards flip.',
                'History. Each finished round is kept with its final estimate, and the history can be downloaded as CSV or copied as Markdown for your backlog tool.',
                'Extras paper cannot do: a story queue that imports a CSV or Jira export, a shared timer, spectator mode, team chat and a nudge for whoever has not voted yet.',
              ],
            },
          ],
        },
        { p: 'If you want printable cards, the values above are all you need: print each value on a card-sized piece of paper, one set per person. For anything beyond an occasional in-person session, an online deck removes the busywork and keeps the focus on the discussion, which is where the value of the technique lives. Our [Scrum Poker guide](/guide) walks through a full online session.' },
      ],
    },
    {
      title: 'How to choose a deck',
      blocks: [
        { p: 'Ask three questions:' },
        {
          ol: [
            '**What are you estimating?** Sprint stories: Scrum or Fibonacci. Epics, roadmap items or anything more than a sprint away: t-shirt sizes. Work with high uncertainty where you want early splitting: Powers of 2.',
            '**Who is voting?** Engineers used to story points are fine with numbers. Mixed or non-technical groups usually prefer sizes.',
            '**What does your tracker expect?** If velocity is tracked in points, use a numeric deck or agree a size-to-point mapping before the session.',
          ],
        },
        { p: 'Whatever you choose, change it rarely. The value of an estimation scale comes from the team\'s accumulated feel for it, and every switch resets that. When you create a room in Scrum Poker Online you pick its deck; the host can change it between rounds, the same deck always appears on every participant\'s screen, and a host who keeps the room through its private owner link finds the same deck and settings next time. If your team regularly disagrees after the reveal, the problem is rarely the deck; see [reaching estimation consensus](/blog/estimation-consensus) for what usually helps.' },
      ],
    },
  ],
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: 'How many cards are in a planning poker deck?',
      a: 'Usually eleven to thirteen. A Fibonacci deck has twelve: ten numeric values plus ? and ☕. The Scrum deck has thirteen, the T-Shirt deck twelve and Powers of 2 eleven. Custom decks in Scrum Poker Online can hold up to 20 cards.',
    },
    {
      q: 'Can I print my own planning poker cards?',
      a: 'Yes. Any of the value sets on this page works; print one full set per participant on card-sized paper. For remote or hybrid teams, an online room is faster to set up and keeps the round history for you.',
    },
    {
      q: 'What does the coffee card mean?',
      a: 'It means "I need a break". It is a lightweight way to signal fatigue without interrupting whoever is speaking, and a few of them in a row are a good cue to pause the session.',
    },
    {
      q: 'Which deck should a new scrum team start with?',
      a: 'Scrum or Fibonacci. Both are widely documented, map directly onto story points, and most tutorials assume one of them. Switch to t-shirt sizes only if numbers cause more debate than they resolve.',
    },
  ],
  ctaText: 'Skip the printing. Pick a deck, share a link, and your team is estimating in seconds. Free, no sign-up.',
  ctaLabel: 'Start a free room',
  relatedTitle: 'Keep reading',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Fibonacci planning poker' },
    { href: '/t-shirt-sizing', label: 'T-shirt sizing in agile' },
    { href: '/guide', label: 'How to run a Scrum Poker session, step by step' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci vs T-shirt sizing' },
    { href: '/blog/what-is-planning-poker', label: 'What is planning poker?' },
    { href: '/blog', label: 'All articles on the blog' },
  ],
};

export default en;
