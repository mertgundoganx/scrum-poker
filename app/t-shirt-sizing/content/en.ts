import type { LandingContent } from '@/app/landingTypes';

const en: LandingContent = {
  breadcrumb: 'T-Shirt Sizing',
  title: 'T-Shirt Sizing in Agile: A Practical Estimation Guide',
  subtitle: 'Estimate with XS, S, M, L and XL instead of numbers: when it works, when it does not and how to run a session.',
  sections: [
    {
      blocks: [
        { p: '**T-shirt sizing** is a relative estimation technique where a team labels work as extra-small, small, medium, large or extra-large instead of assigning a number. It trades precision for speed and comfort: almost anyone can say "that feels like a medium" without a lecture on story points. Agile teams use it for early roadmap planning, epic sizing and any situation where numbers would invite more debate than they are worth. This guide explains the sizes, when t-shirt sizing beats numeric decks, how to convert sizes to points if you need to and how to run a session with your team.' },
      ],
    },
    {
      title: 'What is t-shirt sizing?',
      blocks: [
        { p: 'The method borrows the familiar clothing scale. Each item in the backlog gets a size, and the team compares items to each other rather than measuring them against a clock. A "large" is not a number of hours; it is simply bigger than a "medium" and smaller than an "extra-large". Because the labels are coarse, the team spends less time arguing over small differences and more time on the question that matters: is this item roughly the same size as the last one, or clearly bigger?' },
        { p: 'T-shirt sizing is usually run as [planning poker](/blog/what-is-planning-poker): private votes, simultaneous reveal, discussion of outliers, with the size cards replacing the numeric ones. The mechanics are the same; only the vocabulary changes.' },
      ],
    },
    {
      title: 'The sizes: XS to XXL, and the extended deck',
      blocks: [
        { p: 'The standard set is five or six sizes:' },
        {
          sizes: [
            { size: 'XS', desc: 'Trivial. A copy change, a config flip, a one-line fix.' },
            { size: 'S', desc: 'Small and well understood. A day or less for one person, with no surprises expected.' },
            { size: 'M', desc: 'A typical story. Clear scope, a few moving parts, fits comfortably in a sprint.' },
            { size: 'L', desc: 'A big story. Deliverable in a sprint, but likely to need more than one person or most of the sprint.' },
            { size: 'XL', desc: 'Very large. Probably an epic in disguise; worth splitting before committing.' },
            { size: 'XXL', desc: 'Too big to plan. Needs discovery work before anyone can size it responsibly.' },
          ],
        },
        { p: 'The T-Shirt deck in Scrum Poker Online extends this to `Z, T, XXS, XS, S, M, L, XL, XXL, XXXL`, plus the ? and ☕ cards. Z (zero) covers items that are already done or need no work, T (tiny) sits below XXS for the smallest imaginable change, and XXXL marks work so large that estimating it is pointless until it is broken down. Most teams use only the middle of the deck; the extremes are there so nobody has to force a badly fitting label. If you prefer a shorter or different set, a custom deck of up to 20 cards (up to 4 characters each) handles that. All of the decks are compared on the [planning poker cards](/planning-poker-cards) page.' },
      ],
    },
    {
      title: 'When relative sizing beats numbers',
      blocks: [
        { p: 'Numeric decks like [Fibonacci](/fibonacci-planning-poker) are excellent for sprint-level work. T-shirt sizes shine in three situations:' },
        {
          ul: [
            '**Early roadmap planning.** When you have fifty candidate features and need to know which quarter they might land in, sizing them S, M or L in an afternoon is far more useful than spending a week assigning story points that will be wrong anyway.',
            '**Epics and initiatives.** Large items have too many unknowns for a number to mean anything. "This epic is an XL" is honest; "this epic is 89 points" pretends to a precision nobody has.',
            '**Non-engineering teams.** Marketing, design, operations and content teams often find story points alienating. Sizes are intuitive, need no training and produce the same benefit: a shared, relative sense of effort.',
          ],
        },
        { p: 'Sizes also lower the temperature in discussions. Nobody feels strongly that a story is an M rather than an L in the way they might argue a 5 versus an 8, so consensus tends to arrive faster. For a fuller comparison, see [Fibonacci vs T-shirt sizing](/blog/fibonacci-vs-tshirt).' },
      ],
    },
    {
      title: 'Converting sizes to story points (optional)',
      blocks: [
        { p: 'Some teams want to roll t-shirt sizes into velocity or a capacity model, and for that they need numbers. A common mapping is `XS=1, S=2, M=3, L=5, XL=8, XXL=13`, which mirrors the Fibonacci spread. Another approach is to define each size as a range: S is 1 to 3 points, M is 5 to 8, L is 13 to 21, and anything larger is left unestimated.' },
        { p: 'Two caveats. First, this is optional. Many teams never convert and are better for it, because the moment sizes become numbers people start treating them as commitments. Second, whichever mapping you choose has to be agreed before the session, not after, or the estimates will drift towards whatever mapping flatters the plan. If you find yourself converting on every story, you probably want a numeric deck in the first place. And if the conversion is really an attempt to get hours, read [story points vs hours](/blog/story-points-vs-hours) before you go further.' },
      ],
    },
    {
      title: 'Running a t-shirt sizing session',
      blocks: [
        {
          ol: [
            '**Agree on reference items.** Pick one story the team agrees is an S and one that is an L. Everything else is sized relative to those two.',
            '**Keep the list short.** Sizing works best in batches of ten to thirty items with a one-sentence description each. Paste them into the story queue, or import a CSV or Jira export, so the facilitator can move through them without scrolling a spreadsheet.',
            '**Vote in private, reveal together.** Each participant picks a size card; cards stay hidden until the round is revealed. This prevents the most senior voice in the room from setting the size for everyone else.',
            '**Discuss only real disagreement.** An S next to an M is not worth debating. An S next to an XL is: one of those two people knows something the other does not.',
            '**Record and move on.** Record the final size for each item; the round history can be downloaded as CSV or copied as Markdown, so sizes end up in your backlog tool without anyone transcribing them.',
          ],
        },
        { p: 'A session of thirty items typically takes under an hour. If it is taking longer, the items are probably too vague, not the team too slow.' },
      ],
    },
    {
      title: 'Common pitfalls',
      blocks: [
        {
          ul: [
            '**Treating sizes as durations.** "M means three days" quietly turns relative sizing into hour estimation with extra steps. Sizes are comparisons, not calendars.',
            '**Too many sizes.** If the team is agonizing over XS versus S on every item, agree to skip XS. Fewer buckets mean faster decisions.',
            '**Skipping the reference items.** Without an agreed S and L, "medium" means something different to everyone, and the results are noise.',
            '**Sizing alone.** One person sizing a backlog produces one person\'s assumptions. The value comes from the disagreement between several people.',
            '**Never revisiting.** A size assigned during roadmap planning is a snapshot. Re-size before the item actually enters a sprint, when more is known.',
          ],
        },
      ],
    },
    {
      title: 'Example session',
      blocks: [
        { example: 'A product team is planning next quarter and has twelve candidate features. Working from the story queue, they size them in forty minutes. Nine converge immediately. "Self-serve billing" splits between L and XXL; the XXL voter points out that it requires a tax-calculation integration nobody has scoped. The team records it as XL and adds a discovery task. "Dark mode" splits between S and L; the L voter remembers that the charting library hardcodes its colors. It ends up an M. The team leaves with a sized list, two newly discovered risks, and no arguments about whether something is a 5 or an 8.' },
      ],
    },
  ],
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: 'Is t-shirt sizing the same as story points?',
      a: 'No. Story points are numeric and feed into velocity; sizes are ordinal labels. You can map sizes to points, but the mapping is a convention the team agrees on, not a measurement.',
    },
    {
      q: 'How many sizes should we use?',
      a: 'Five is a good default (XS to XL). Add XXL when you regularly meet items too big to plan, and drop XS if the team rarely uses it. The extended deck exists so you do not have to decide up front.',
    },
    {
      q: 'Can we use t-shirt sizing for sprint planning?',
      a: 'You can, but most teams switch to a numeric deck for sprint-level stories because it makes velocity easier to track. Use sizes for the roadmap and epics, then Fibonacci once stories are refined.',
    },
    {
      q: 'What if the team cannot agree on a size?',
      a: 'Discuss the two extremes, then re-vote once. If it is still split, take the larger size, since underestimating usually hurts more than overestimating, and note the uncertainty next to the item.',
    },
  ],
  ctaText: 'Size your backlog with the T-Shirt deck. Free, no sign-up, up to 50 participants per room.',
  ctaLabel: 'Start a free room',
  relatedTitle: 'Keep reading',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Fibonacci planning poker' },
    { href: '/planning-poker-cards', label: 'Planning poker cards and decks' },
    { href: '/guide', label: 'How to run a Scrum Poker session, step by step' },
    { href: '/blog/estimation-consensus', label: 'Reaching estimation consensus' },
    { href: '/blog/story-points-vs-hours', label: 'Story points vs hours' },
    { href: '/blog', label: 'All articles on the blog' },
  ],
};

export default en;
