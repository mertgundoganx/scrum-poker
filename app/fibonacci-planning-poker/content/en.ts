import type { LandingContent } from '@/app/landingTypes';

const en: LandingContent = {
  breadcrumb: 'Fibonacci Planning Poker',
  title: 'Fibonacci Planning Poker: Cards, Sequence & How to Use It',
  subtitle: 'The most popular planning poker deck, explained: what the numbers mean, why the gaps grow and how to run a round with your team.',
  sections: [
    {
      blocks: [
        { p: '**Fibonacci planning poker** is the most common way agile teams estimate user stories. Instead of guessing hours, each person picks a card from a short, fixed sequence (0, 1, 2, 3, 5, 8, 13, 21 and so on) and everyone reveals at once. The result is a relative estimate in story points the whole team agreed on. This guide covers the sequence, why it works, how to run a round and what to do when a story lands on the big cards. New to the technique? Start with [What is planning poker?](/blog/what-is-planning-poker) and come back.' },
      ],
    },
    {
      title: 'The Fibonacci planning poker sequence',
      blocks: [
        { p: 'The mathematical Fibonacci sequence starts 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, each number being the sum of the two before it. Planning poker decks borrow the shape, not the arithmetic: the duplicate 1 is dropped, and beyond 13 the decks diverge:' },
        {
          ul: [
            '**Classic Fibonacci:** `0, 1, 2, 3, 5, 8, 13, 21, 34, 55`. This is the Fibonacci deck in Scrum Poker Online, plus the ? and ☕ cards.',
            '**Modified Fibonacci:** `0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100`. The large numbers are rounded to signal that they are rough buckets, not precise values. This is the Scrum deck in Scrum Poker Online, again with ? and ☕.',
            '**Short variants:** some teams stop at 13 or 21 and treat anything larger as too big to estimate.',
          ],
        },
        { p: 'Which variant you use matters far less than using it consistently. A team that has estimated with 21, 34 and 55 for a year has a shared sense of what those numbers mean; switching to 20, 40 and 100 would reset that calibration. If you need a different set, a custom deck of up to 20 cards (up to 4 characters each) lets you define your own values. The other standard decks are compared on the [planning poker cards](/planning-poker-cards) page.' },
      ],
    },
    {
      title: 'Why the gaps grow: uncertainty scales with size',
      blocks: [
        { p: 'The defining feature of the sequence is that the distance between neighboring cards grows with the numbers. Between 1 and 2 the gap is one point; between 13 and 21 it is eight; between 34 and 55 it is twenty-one. This is intentional, and it is the main reason Fibonacci beat a plain 1 to 10 scale for estimation.' },
        { p: 'People are reasonably good at telling a tiny task from a small one, and much worse at telling a large task from a slightly larger one. If your deck offered 20, 21, 22 and 23, the team would argue over differences nobody can actually perceive, and the final number would carry a precision it does not deserve. By offering only 13 and 21, the deck asks a coarser, more honest question: is this closer to a 13 or a 21? That is answerable. "Is this a 17 or an 18?" is not. Small, well-understood stories get fine-grained cards; large stories hide unknowns, so they get coarse ones.' },
      ],
    },
    {
      title: 'How to run a Fibonacci planning poker round',
      blocks: [
        {
          ol: [
            '**Pick a reference story.** Choose a delivered story the team agrees was a 2 or a 3. Every other estimate is made relative to it.',
            '**Present the story.** The Product Owner reads the story and acceptance criteria; the team asks questions until the scope is clear.',
            '**Vote privately.** Each estimator picks a card. Online, cards stay hidden until the round is revealed, so nobody is anchored by the first number spoken.',
            '**Reveal together.** All cards flip at once. Scrum Poker Online shows the vote distribution, min, median, average and max, whether consensus was reached, and a suggested estimate.',
            '**Discuss the outliers.** If one person voted 3 and another 13, both explain why. The gap almost always reveals an assumption: a missing API, a forgotten migration, a test setup that already exists.',
            '**Re-vote if needed.** Most stories converge in two rounds. If not, take the higher value or split the story. Once the team agrees, record the final estimate and move on to the next story.',
          ],
        },
        { p: 'Keep each story to a few minutes; the shared timer in the room (counting up or down) is there so discussion does not run away. For getting a divided team to agree, read [reaching estimation consensus](/blog/estimation-consensus).' },
      ],
    },
    {
      title: 'Mapping Fibonacci cards to story points',
      blocks: [
        { p: 'Story points are the unit; Fibonacci cards are the allowed values. A card of 5 means "about five times the effort of a 1, and a bit less than twice a 3". The absolute number is meaningless on its own: a 5 on one team can be an 8 on another, which is why points do not convert cleanly to hours. If you are tempted to convert, read [story points vs hours](/blog/story-points-vs-hours) first.' },
        { p: 'What the cards commonly signal:' },
        {
          ul: [
            '**0**: trivial, already done or a no-risk config flip.',
            '**1 to 2**: small, well understood, no unknowns.',
            '**3 to 5**: a typical sprint story with clear scope and a few moving parts.',
            '**8**: large but deliverable in a sprint by one or two people.',
            '**13**: the upper edge of what most teams accept as a single sprint story.',
            '**21 and above**: an epic, or a story with big unknowns. Usually a signal to split.',
          ],
        },
      ],
    },
    {
      title: 'The ? and ☕ cards',
      blocks: [
        { p: 'Every built-in deck in Scrum Poker Online includes two non-numeric cards (a custom deck holds only the cards you add), and they are more useful than they look.' },
        { p: 'The **?** card means "I cannot estimate this yet". It is not a cop-out; it is data. If two people play ?, the story needs a scope conversation before the team votes again. Playing ? beats guessing 8 and hoping.' },
        { p: 'The **☕** card means "I need a break". Estimation quality drops as people tire, and a few coffee cards in a row are a reliable sign the session has gone on too long. Take five minutes, then come back.' },
      ],
    },
    {
      title: 'When to cap at 13 or 21 and split the story',
      blocks: [
        { p: 'Many teams rule that anything estimated at 13 or above must be split before it enters a sprint. The bigger the estimate, the wider the uncertainty band, and a 21 that turns out to be a 34 can sink a sprint. Splitting turns one fuzzy number into several sharper ones.' },
        { p: 'Practical ways to split:' },
        {
          ul: [
            '**By workflow step:** "submit the form" separate from "review and approve".',
            '**By data variation:** common case first, edge cases later.',
            '**By interface:** API first, UI second.',
            '**By acceptance criterion:** each criterion becomes a story.',
          ],
        },
        { p: 'Whether you cap at 13 or 21 depends on sprint length and team size; two-week sprints with a team of five usually land on 13. Decide once, write it down and apply it consistently.' },
      ],
    },
    {
      title: 'Example round',
      blocks: [
        { example: 'A team of five is estimating "Allow users to export their round history as CSV". Votes reveal as 3, 5, 5, 8 and 13: no consensus, a spread from 3 to 13, and 8 suggested as the card nearest the 6.8 average. The 13 voter explains that the history table has no pagination and exporting thousands of rows will time out. The 3 voter did not know the export must also work for spectators. The team agrees the core export is a 5 and adds a separate story for pagination. The second vote is 5, 5, 5, 5, 8: close enough to accept 5 and move on.' },
        { p: 'That is the whole technique: the numbers matter less than the conversation they trigger.' },
      ],
    },
  ],
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: 'Why not just use a 1 to 10 scale?',
      a: 'A linear scale implies you can tell a 7 from an 8. For anything bigger than a small task you cannot, so the team wastes time on false precision. Fibonacci gaps grow with the estimate, matching how uncertainty behaves.',
    },
    {
      q: 'Is 21 a real Fibonacci number, or should I use 20?',
      a: 'Both are common. 21 is the true Fibonacci value; 20, 40 and 100 come from the modified deck (the Scrum deck in Scrum Poker Online) and are rounded to stress that they are rough buckets. Pick one and stay consistent.',
    },
    {
      q: 'Should I average the votes?',
      a: 'Not automatically. The average of 3 and 13 is 8, but that hides the disagreement that matters. Discuss the outliers first; if the team is still split after a re-vote, prefer the higher value or split the story.',
    },
    {
      q: 'Can I use Fibonacci cards for bugs and tech debt?',
      a: 'Yes, as long as they are estimated relative to the same reference story as everything else. Many teams reserve 0 for trivial bugs and estimate the rest normally.',
    },
  ],
  ctaText: 'Ready to estimate with Fibonacci cards? Free, up to 50 people per room, no sign-up.',
  ctaLabel: 'Start a free room',
  relatedTitle: 'Keep reading',
  related: [
    { href: '/t-shirt-sizing', label: 'T-shirt sizing in agile' },
    { href: '/planning-poker-cards', label: 'Planning poker cards and decks' },
    { href: '/guide', label: 'How to run a Scrum Poker session, step by step' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci vs T-shirt sizing' },
    { href: '/blog/story-points-vs-hours', label: 'Story points vs hours' },
    { href: '/blog', label: 'All articles on the blog' },
  ],
};

export default en;
