import type { Localized } from '../articleTypes';

const en: Localized = {
  title: 'Fibonacci vs T-Shirt Sizing: Which Agile Estimation Scale Should You Use?',
  subtitle: 'How the two most popular estimation scales work, why the Fibonacci gaps grow, when each one fits, and how to convert between them.',
  sections: [
    {
      title: 'Fibonacci vs T-shirt sizing: the short answer',
      content: 'Use Fibonacci story points when you need numbers you can add up, track as velocity and use for sprint forecasting. Use T-shirt sizing when you need a fast, low-friction sense of relative size, such as a first pass over a large backlog, roadmap conversations with stakeholders, or a team that is new to estimation. Many teams use both: T-shirts for coarse sizing far ahead, Fibonacci for the stories that are about to enter a sprint. Neither scale is "more accurate" on its own; the difference is granularity and what you can do with the result afterwards.',
    },
    {
      title: 'What is Fibonacci estimation in agile?',
      content: '[Fibonacci estimation](/fibonacci-planning-poker) assigns story points to backlog items using values taken from the Fibonacci sequence, in which each number is the sum of the two before it: 1, 2, 3, 5, 8, 13, 21, 34. Most agile teams use the modified version popularized by Mike Cohn in "Agile Estimating and Planning": 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. The larger values are rounded because a 21 versus a 20 would imply a precision nobody actually has.',
      paragraphs: [
        'A story rated 8 is not eight hours and not eight days. It means the team judges the story to be noticeably bigger than a 5 and noticeably smaller than a 13, taking effort, complexity, uncertainty and risk into account. The points only make sense relative to a reference story the team already knows, for example "the password reset flow was a 3". Fibonacci is the default deck in Planning Poker and in most tools.',
      ],
    },
    {
      title: 'Why the gaps grow: the logic behind the Fibonacci scale',
      content: 'The defining property of the sequence, for estimation purposes, is that each step is roughly 1.6 times the previous one, so the gaps widen as the numbers grow. That shape matches how people perceive size. Everyone can tell a 2-point story from a 3-point story. Nobody can honestly tell a 20 from a 21. A linear scale (1, 2, 3, 4, 5, 6, 7, 8…) invites arguments about distinctions the team cannot actually make.',
      paragraphs: [
        'The usual justification is the Weber–Fechner principle from psychophysics: the smallest difference a person can notice is proportional to the size of the thing being compared. A scale whose steps grow proportionally lines up with that limit, so each card represents a difference the team can genuinely perceive. When a team is torn between 20 and 40, the honest answer is usually "we do not know enough yet", and the story should be split or spiked rather than argued over.',
      ],
    },
    {
      title: 'What is T-shirt sizing?',
      content: '[T-shirt sizing](/t-shirt-sizing) categorizes backlog items into a handful of buckets named after clothing sizes: XS, S, M, L, XL and sometimes XXL. It is a relative scale like Fibonacci, but a deliberately coarse one. An "M" simply means "about the size of the other things we called M", and the team decides what that looks like by pointing at real examples.',
      paragraphs: [
        'The appeal is that sizes are not numbers. There is no temptation to add them up, to convert them into hours, or to argue about whether something is a 5 or a 6. Non-technical stakeholders find them intuitive, and a team that has never estimated before can produce useful T-shirt sizes in its first session. The scale shines when sizing a large set of items at once, such as a quarter’s roadmap or a batch of epics.',
      ],
    },
    {
      title: 'How T-shirt sizing works in practice',
      content: 'A T-shirt sizing session is short and can be run with cards, sticky notes or an online deck:',
      items: [
        '1. Agree on anchors. Pick one item the team agrees is a clear S and one that is a clear L. Every other item is sized relative to those.',
        '2. Present each item briefly. The Product Owner gives the one-sentence version; deep questions are deferred unless they block the sizing.',
        '3. Everyone picks a size privately and reveals at the same time, exactly as in Planning Poker, so the first voice does not anchor the room.',
        '4. Discuss only the outliers. If most of the team says M and one person says XL, that person explains what they see.',
        '5. Record the size and move on. A typical session covers far more items per hour than a Fibonacci session, because the scale invites less debate.',
        '6. Convert later if needed. Items that make it near the top of the backlog get re-estimated in story points when the team is ready to plan a sprint.',
      ],
    },
    {
      title: 'Fibonacci vs T-shirt sizing: side-by-side comparison',
      content: 'The practical differences, criterion by criterion:',
      items: [
        'Granularity: Fibonacci gives roughly ten distinct values; T-shirt sizing gives five or six. Fibonacci can separate a 5 from an 8; T-shirts lump both into M or L.',
        'Arithmetic: Fibonacci points can be summed into a sprint total and averaged into velocity. T-shirt sizes cannot be added without first mapping each size to a number.',
        'Forecasting: with velocity, Fibonacci points support "how many sprints will this take?" answers. T-shirt sizes support "roughly how big is this quarter?" answers.',
        'Speed: T-shirt sizing is faster per item and easier to run over a large batch. Fibonacci is slower because the finer scale invites more discussion.',
        'Learning curve: T-shirts are immediately intuitive. Fibonacci needs a reference story and a short explanation of why the numbers are not hours.',
        'Risk of misuse: Fibonacci points are more likely to be silently converted into hours or turned into a productivity metric. T-shirts are more likely to be too vague to plan a sprint with.',
      ],
    },
    {
      title: 'When to use Fibonacci story points',
      content: 'Fibonacci is the better choice when the output of estimation feeds planning arithmetic:',
      items: [
        'Sprint planning: the team needs to decide how many stories fit into a sprint, and that means adding sizes together.',
        'Velocity tracking: a stable team wants to compare sprints and forecast releases from its own history.',
        'Stakeholder forecasts: "this epic is about 60 points and we average 25 per sprint" is a concrete, defensible answer.',
      ],
    },
    {
      title: 'When to use T-shirt sizing',
      content: 'T-shirt sizing wins when speed and accessibility matter more than arithmetic:',
      items: [
        'Backlog triage: sizing dozens of items to decide which are worth refining further.',
        'Roadmap and quarterly planning: comparing epics or initiatives that will be broken down later anyway.',
        'New teams: a team in its first sprints has no velocity to feed and no reference stories yet; T-shirts get it estimating without ceremony.',
        'Mixed audiences: when designers, product managers or business stakeholders take part, sizes are less intimidating and less likely to be mistaken for commitments.',
      ],
    },
    {
      title: 'Can you convert T-shirt sizes to story points?',
      content: 'Yes, and many teams do, but treat the mapping as a convenience rather than a fact. A common mapping is XS = 1, S = 2, M = 3 or 5, L = 8, XL = 13, XXL = 20 or more. The mapping should be agreed by the team, written down, and kept stable, because changing it silently corrupts velocity history.',
      paragraphs: [
        'The cleaner approach is not to convert at all: keep T-shirt sizes on epics and far-future items, and re-estimate individual stories in Fibonacci points when they get close to a sprint. The T-shirt size was a rough sort; the story-point estimate is made with better information and a proper reference story.',
        'Whatever you do, never [convert points or sizes into hours](/blog/story-points-vs-hours) per story. Both scales describe relative size. Time comes from velocity, which is measured over whole sprints, not from a per-story formula.',
      ],
    },
    {
      title: 'A worked example: the same three stories on both scales',
      content: 'Imagine a team refining three stories. Its Fibonacci reference is "the password reset flow was a 3"; its T-shirt anchors are "reset flow = S" and "admin dashboard = L".',
      paragraphs: [
        '"Add a confirmation toast after saving the profile." Fibonacci: everyone plays 1 or 2, recorded as 2. T-shirt: everyone plays XS. Both scales agree and neither needed discussion.',
        '"Export order history as CSV, paginated for large accounts." Fibonacci: cards come up 5, 5, 8, 8, 13; after the 13 explains that two services are involved, the team settles on 8. T-shirt: the same story gets M, M, L, L, L; the team settles on L. The Fibonacci discussion produced a more specific outcome; the T-shirt discussion only established "bigger than M".',
        '"Integrate the new payment provider." Fibonacci: half the team plays "?" and the rest play 40 or 100, so the story is sent to a spike. T-shirt: everyone plays XL, and the team happily records it. Here the coarser scale hid a problem: XL was easy to agree on because it commits to nothing, while Fibonacci forced the team to admit it did not know.',
      ],
    },
    {
      title: 'Common mistakes with each scale',
      content: 'Both scales fail in predictable ways when they are used without a reference or with the wrong intent:',
      items: [
        'Fibonacci: mapping points to hours ("a 5 is about a day"). Once that happens the scale is just hours with extra steps, and every anti-pattern of hour estimation returns.',
        'Fibonacci: using points to measure individual productivity. Estimates inflate within a sprint or two and velocity stops meaning anything.',
        'T-shirt: using too many sizes. Splitting hairs between XXS, XS and S on every item recreates the granularity of numbers without their arithmetic. Five or six buckets is usually enough, even if your deck offers more.',
        'T-shirt: planning a sprint with sizes alone. "Three L and four M" does not tell you whether the sprint is full. Convert or re-estimate before committing.',
      ],
    },
    {
      title: 'Other scales: Powers of 2 and custom decks',
      content: 'Fibonacci and T-shirts are the most common scales, but not the only ones. Powers of 2 (1, 2, 4, 8, 16, 32) offer an even stricter doubling between cards and suit teams that want each step to be unambiguous. Some teams define a custom deck that only contains the values they actually use, for example 1, 2, 3, 5, 8, 13 and "?".',
      paragraphs: [
        'Scrum Poker Online supports Fibonacci, T-shirt, Powers of 2 and custom decks, and the room\'s host can switch decks between rounds, so moving from a roadmap session to sprint planning is a matter of changing a setting, not a tool. It is free, needs no sign-up, and supports up to 50 participants.',
      ],
    },
    {
      title: 'Our recommendation',
      content: 'Start with Fibonacci if your team plans in sprints, tracks velocity, or already stores story points in its tooling. Start with T-shirt sizing if the team is new to estimation, the backlog is large and rough, or non-technical stakeholders sit in the session. Use both if you have a long roadmap: T-shirts to sort the far future, Fibonacci for the next few sprints. Whichever you pick, [start a free planning poker room](/) to try it, keep a visible reference item, reveal simultaneously, and never translate the result into hours per story.',
    },
  ],
  faq: [
    {
      q: 'Why does agile estimation use the Fibonacci sequence?',
      a: 'Because the gaps between consecutive values grow with the values themselves, which matches the way people perceive differences in size. A team can tell a 2 from a 3 but not a 20 from a 21, so the deck skips the values nobody can distinguish.',
    },
    {
      q: 'Is T-shirt sizing the same as story points?',
      a: 'No. Both are relative estimation scales, but story points are numbers that can be summed and turned into velocity, while T-shirt sizes are categories that cannot be added without an agreed mapping.',
    },
    {
      q: 'How do I convert T-shirt sizes to story points?',
      a: 'Agree on a mapping as a team, for example XS = 1, S = 2, M = 3 or 5, L = 8, XL = 13, write it down and keep it stable. Better still, re-estimate stories in points when they get close to a sprint instead of converting mechanically.',
    },
    {
      q: 'Is 1 story point equal to 1 hour?',
      a: 'No. Story points describe relative size, not time. Time forecasts come from velocity, which is measured over whole sprints, not from a per-story conversion.',
    },
    {
      q: 'Which scale is better for a new agile team?',
      a: 'T-shirt sizing is usually the easier start, because it needs no reference story or velocity history. Once the team has a few completed stories to anchor on, it can move to Fibonacci for sprint planning.',
    },
  ],
};

export default en;
