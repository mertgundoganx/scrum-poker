import type { Localized } from '../articleTypes';

const en: Localized = {
  title: 'What Is Planning Poker? A Complete Guide to Agile Estimation',
  subtitle: 'What Planning Poker is, where it came from, how a session works step by step, which cards to use, and the mistakes that quietly ruin your estimates.',
  sections: [
    {
      title: 'What is Planning Poker? (Definition)',
      content: 'Planning Poker is a consensus-based, gamified estimation technique used by agile teams to size backlog items such as user stories. Each participant privately picks a card that represents their estimate, everyone reveals at the same time, and the team discusses the differences until it agrees on a single value. The number on the card is usually a story point, not a number of hours.',
      paragraphs: [
        'The defining feature is the simultaneous reveal. When people say their estimates out loud one after another, the first number anchors everyone who follows. Hiding the cards until the reveal removes that anchor, so the team sees what each person genuinely thinks before any discussion starts.',
        'The second defining feature is that disagreement is treated as information. If one developer holds up a 3 and another a 13, two people have very different pictures of the same story, and that conversation is where most of the value comes from.',
      ],
    },
    {
      title: 'Planning Poker vs Scrum Poker — is there a difference?',
      content: 'No. Planning Poker and Scrum Poker are two names for the same technique. "Planning Poker" is the original name from James Grenning’s 2002 paper and Mike Cohn’s book, while "Scrum Poker" became popular because most teams that use it run Scrum and estimate during backlog refinement or sprint planning. "Pointing poker" and "estimation poker" mean the same thing, and none of them is tied to Scrum: Kanban and non-software teams use it just as well.',
    },
    {
      title: 'Where did Planning Poker come from? Grenning, Cohn and Wideband Delphi',
      content: 'Planning Poker was first described by James Grenning in 2002, in a short paper written for Extreme Programming teams who were losing hours to release-planning debates. His goal was to avoid "analysis paralysis": get every voice heard quickly, stop the loudest person from setting the number, and move on.',
      paragraphs: [
        'The technique became mainstream when Mike Cohn included it in "Agile Estimating and Planning" (2005). Cohn’s version popularized the modified Fibonacci deck (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) that most teams use today.',
        'The intellectual ancestor is the Delphi method, developed at the RAND Corporation, and its software-estimation variant, Wideband Delphi: experts estimate independently, results are shared, the group discusses, and the cycle repeats until estimates converge. Planning Poker keeps that structure but compresses it into a few minutes per item and adds a deck of cards.',
      ],
    },
    {
      title: 'How does a Planning Poker session work? Step by step',
      content: 'A typical session involves the development team, the Product Owner, and usually a Scrum Master or facilitator. It runs like this:',
      items: [
        '1. Pick a reference story. Before the session, agree on one or two recently completed stories with known sizes (for example, "the password reset flow was a 3"). Every estimate is relative to those references.',
        '2. The Product Owner presents a backlog item: the user story, the acceptance criteria and any known constraints. The goal is a shared understanding of "done", not a technical design.',
        '3. The team asks clarifying questions, time-boxed to two or three minutes.',
        '4. Everyone selects a card privately, comparing the story with the reference stories and taking effort, complexity, uncertainty and risk into account.',
        '5. All cards are revealed at the same time. In an online tool, someone (usually the facilitator) clicks "reveal" once every vote is in.',
        '6. If the estimates agree, record the value and move on. Estimates one card apart (a 5 and an 8) usually count as agreement.',
        '7. If they diverge, the highest and lowest estimators explain their reasoning. Nobody argues; the point is to surface what one person knows that the others do not.',
        '8. Re-vote. Most stories converge within two rounds. If a story is still divided after three rounds, it usually needs to be split into smaller stories or investigated with a spike.',
      ],
    },
    {
      title: 'What do the Planning Poker cards mean?',
      content: 'The most common deck is the [modified Fibonacci sequence](/fibonacci-planning-poker): 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. The numbers are deliberately spaced further apart as they grow. Nobody can honestly tell a 20-point story from a 21-point story, so there is no 21 card; the deck jumps to 40. The larger the story, the less precise the estimate can be, and the deck encodes that.',
      paragraphs: [
        'The usual rationale for the growing gaps is the Weber–Fechner principle: people perceive differences in proportion to the size of what they are comparing. A one-point gap between 1 and 2 is obvious; the same gap between 40 and 41 is imperceptible. A scale whose steps grow roughly proportionally matches how estimators actually perceive size.',
        'Most decks also include [special cards](/planning-poker-cards). "?" means "I do not understand this story well enough to estimate it", the infinity symbol means "this is too large and should be split", and a coffee cup means "I need a break". The 0 card is for trivially small items and should be used sparingly. Alternatives to Fibonacci include [T-shirt sizes](/t-shirt-sizing) (XS to XL), powers of two (1, 2, 4, 8, 16, 32) and custom decks; the choice matters less than using the same deck consistently.',
      ],
    },
    {
      title: 'Why does Planning Poker produce better estimates?',
      content: 'Planning Poker works not because cards are magic, but because the format counters several well-known failure modes of group decision-making:',
      items: [
        'It removes anchoring. Because cards are hidden until the reveal, the first number spoken cannot drag the others toward it. This is the single biggest reason teams adopt the technique.',
        'It forces participation. Every estimator must put down a card, so quiet team members have to commit to a number.',
        'It surfaces hidden assumptions. A wide spread almost always means someone knows something the others do not: a dependency, a fragile module, an existing helper that makes the work trivial.',
        'It estimates relatively, not absolutely. "Is this bigger than the password reset story?" is a much easier question to answer well than "how many hours will this take?".',
      ],
    },
    {
      title: 'A worked example: estimating three stories',
      content: 'Suppose a team has agreed that "Add a forgot-password link that e-mails a reset token" is a reference 3, and "Build the admin reporting dashboard" was a 13. The Product Owner brings three new stories to refinement.',
      paragraphs: [
        'Story A: "Show a confirmation toast after the user saves their profile." Everyone reveals 1 or 2; it follows an existing UI pattern. The team records a 2 and moves on in under a minute.',
        'Story B: "Let users export their order history as CSV." Cards come up 3, 5, 5, 8, 13. The 13 explains that order history spans two services and the export must be paginated for large accounts. The 3 admits they had assumed a single table. On the re-vote the cards are 8, 8, 8, 5, 8, and the team records an 8.',
        'Story C: "Integrate with the new payment provider." Half the team plays "?", the other half plays 40 or infinity. Nobody has seen the provider’s documentation. The team does not force a number; it creates a short spike to read the docs and re-estimates next week. A well-run session spends its minutes where the disagreement is.',
      ],
    },
    {
      title: 'Planning Poker vs other agile estimation techniques',
      content: 'Planning Poker is not the only way to size a backlog. Here is how it compares with the usual alternatives:',
      items: [
        'Expert or top-down estimation (one lead assigns the numbers): fast, but it captures one person’s knowledge, tends toward optimism, and gives the team no ownership of the estimate.',
        'T-shirt sizing (XS to XL): faster and less intimidating, good for a first pass over a large backlog or for non-technical participants, but less granular and not directly summable for velocity. Many teams size with T-shirts early and switch to Planning Poker for sprint-level items.',
        'Affinity estimation or bucket system: the team silently sorts dozens of stories into size buckets, then discusses. Excellent for sizing a whole backlog in one session; weaker for a single tricky story.',
        'Hour-based estimation: precise-looking but fragile, because it depends on who does the work. Most agile teams estimate in points and derive time forecasts from velocity.',
      ],
    },
    {
      title: 'Common Planning Poker mistakes (and how to fix them)',
      content: 'Most complaints about Planning Poker trace back to a handful of avoidable mistakes:',
      items: [
        'Estimating in hours with point cards. If the team secretly maps 5 points to 5 hours, the benefits of relative estimation disappear. Fix: always compare with the reference story, never with a clock.',
        'Skipping the discussion. Averaging the cards misses the point; the conversation between the high and the low estimator is the value. Fix: outliers speak before any re-vote.',
        'Letting a senior person go first. If the tech lead announces "this is obviously a 3" before votes are cast, the reveal is meaningless. Fix: no numbers are spoken until the cards are shown.',
        'Having no reference story. Without a shared baseline every estimator has a private scale. Fix: keep one or two well-understood completed stories visible during the session.',
        'Treating the estimate as a commitment. Story points describe size, not a promise. Teams punished for "missing" their points learn to inflate them, and the numbers stop meaning anything.',
      ],
    },
    {
      title: 'When to use Planning Poker — and when not to',
      content: 'Planning Poker is the right tool when the estimate benefits from several perspectives and a wrong estimate has a real cost. It is not the right tool for everything.',
      items: [
        'Use it for backlog refinement and sprint planning, where each story entering the next sprint or two needs a size.',
        'Use it when knowledge is spread across a cross-functional team: front-end, back-end, QA and operations often see different risks in the same story.',
        'Skip it for a first pass over a hundred-item backlog; sort roughly with T-shirt sizes first, then run Planning Poker on the items near the top.',
        'Skip it for stories that are not ready. A spike or a conversation with the Product Owner comes first.',
      ],
    },
    {
      title: 'Running Planning Poker with a remote or hybrid team',
      content: 'Physical cards do not work over a video call, so remote teams use an online tool. The essentials are simple: private voting, a single simultaneous reveal, a shared view of the results, and a deck the team is used to.',
      paragraphs: [
        'Scrum Poker Online is a free option built around exactly that flow: [create a free room](/), share the link, and up to 50 participants can vote without signing up. It supports Fibonacci, T-shirt, Powers of 2 and custom decks, so a team can keep whatever scale it already has. Whatever the tool, the facilitation rules do not change.',
      ],
    },
  ],
  faq: [
    {
      q: 'Is Planning Poker the same as Scrum Poker?',
      a: 'Yes. They are two names for the same estimation technique. "Planning Poker" is the original name; "Scrum Poker" simply reflects the fact that most teams using it work in Scrum.',
    },
    {
      q: 'Why does Planning Poker use the Fibonacci sequence?',
      a: 'Because the gaps between the numbers grow as the numbers grow, which matches how people perceive size: it is easy to tell a 2 from a 3, but nobody can reliably tell a 20 from a 21. The modified deck popularized by Mike Cohn rounds the larger values for the same reason.',
    },
    {
      q: 'Who should participate in Planning Poker?',
      a: 'Everyone who will do the work: developers, testers and anyone else on the delivery team. The Product Owner presents the stories and answers questions but does not vote; managers may observe but should not hold cards.',
    },
    {
      q: 'How long should a Planning Poker session take?',
      a: 'Aim for a few minutes per story and no more than one to two hours per session. If a single story takes much longer, it usually needs to be split or clarified rather than debated further.',
    },
    {
      q: 'What do the ? and infinity cards mean?',
      a: 'The "?" card means the estimator does not understand the story well enough to size it. The infinity card means the story is too large to estimate and should be broken down. Both are signals to stop voting and refine the story instead.',
    },
  ],
};

export default en;
