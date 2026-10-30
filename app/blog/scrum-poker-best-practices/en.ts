import type { Localized } from '../articleTypes';

const en: Localized = {
  title: '10 Scrum Poker Best Practices for Better Estimates',
  subtitle: 'Practical techniques that make planning poker sessions faster, more consistent, and more useful for sprint planning — with realistic examples and a FAQ.',
  sections: [
    {
      title: 'What Scrum Poker Is (and Why Best Practices Matter)',
      content: 'Scrum poker — also called planning poker — is a consensus-based estimation technique. Each team member holds a deck of cards (usually a modified Fibonacci sequence: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100), the Product Owner presents a user story, everyone picks a card privately, and all cards are revealed at the same time. If the estimates agree, you move on. If they differ, the team discusses why and votes again.',
      paragraphs: [
        'The mechanics are simple, but the quality of the output depends almost entirely on [how the session is run](/guide). A team that reveals cards one at a time, argues about hours, and lets the loudest engineer set the number will get worse estimates than a team that never used planning poker at all — and it will take longer. The practices below come from what consistently works in real sprint planning sessions, whether the team sits in one room or votes through a browser.',
        'Use this article as a checklist. Pick two or three practices your team is not doing yet, apply them for a couple of sprints, and see what changes.',
      ],
    },
    {
      title: '1. Estimate Complexity and Effort, Not Hours',
      content: 'Story points express relative size: how much work, complexity, and uncertainty a story carries compared with other stories. A 5 is roughly "a bit less than twice a 3", not "five hours". This distinction is the foundation of everything else, because relative estimation is what lets a team compare stories quickly without pretending to know exactly how long each will take.',
      paragraphs: [
        'When someone says "this is about two days, so it is a 5", gently redirect: "Compared with the export feature we did last sprint, is this bigger or smaller?" Anchoring to calendar time drags in personal speed, meetings, and interruptions that have nothing to do with the story itself. Points also stay stable when the team composition changes; hours do not.',
        'A practical test: if two developers with different experience levels would give the same point value for a story but different hour estimates, your team is thinking in points correctly.',
      ],
    },
    {
      title: '2. Keep a Set of Reference Stories',
      content: 'Relative estimation only works if everyone compares against the same baseline. Pick a few completed, well-understood stories and pin them to a scale: "The password reset e-mail was a 2. The CSV export with filters was a 5. The payment provider migration was a 13." Keep this list visible during every session.',
      paragraphs: [
        'Reference stories fix two common problems. New team members can calibrate quickly instead of guessing what a 3 means on this team. And point inflation — where a 3 slowly becomes what a 5 used to be — is easier to spot, because the team keeps checking against the same examples.',
        'Refresh the reference list every few months. A story that was a 5 a year ago may no longer be representative if the codebase or the team has changed significantly.',
      ],
    },
    {
      title: '3. Refine Stories Before You Estimate Them',
      content: 'Planning poker exposes uncertainty, but it should not be the first time anyone reads a story. Backlog refinement — a short session a few days before sprint planning — is where the Product Owner clarifies the goal, acceptance criteria, and known constraints. By the time the story reaches the poker table, the team should be estimating a solution, not decoding a title.',
      items: [
        'Every story has a clear "who, what, why" and at least a few acceptance criteria.',
        'Open questions are listed on the story, not discovered mid-vote.',
        'Dependencies on other teams or systems are called out explicitly.',
        'The Product Owner gives a one- to two-minute summary before the first vote and answers questions before anyone picks a card.',
      ],
    },
    {
      title: '4. Vote Privately and Reveal Simultaneously',
      content: 'The single most important rule of planning poker: nobody sees anybody else\'s card until everyone has chosen. Revealing one by one, or asking a senior engineer to "go first", creates anchoring bias — the first number becomes the reference point and later estimates cluster around it, whether or not they should.',
      paragraphs: [
        'In a room, this means holding cards face down and flipping together. Online, it means using a tool that hides votes until the round is revealed. Scrum Poker Online, for example, keeps every vote hidden until someone in the room reveals the round, and it is free with no sign-up, so the whole team can join with a room code in seconds.',
        'The same rule applies to body language and side comments. "Oh, this one is easy" said before voting is an anchor too. Ask people to save opinions for the discussion after the reveal.',
      ],
    },
    {
      title: '5. Let the Outliers Explain First',
      content: 'When the reveal shows a spread — say, 3, 3, 5, 5, and 13 — do not average the numbers and do not let the majority talk over the outlier. Ask the highest and lowest voters to explain their reasoning first. The person who voted 13 might know that the third-party API has an undocumented rate limit; the person who voted 3 might know that a helper already exists for half the work.',
      paragraphs: [
        'This conversation is the actual product of planning poker. The number is a by-product. Teams that skip it and simply take the median lose the shared understanding that makes the sprint go smoothly.',
        'Keep the discussion factual: what is the work, what are the risks, what has been done before. If the debate turns into "how would you implement it", note the design question and move on — you are estimating, not designing.',
      ],
    },
    {
      title: '6. Re-vote, Then Decide — Do Not Loop Forever',
      content: 'After the outliers have spoken, vote again. Most stories [reach consensus on the second round](/blog/estimation-consensus) because the information gap that caused the spread is now closed. If the second round still shows a wide spread, the story itself is probably unclear or too large, and more voting will not fix that.',
      items: [
        'Round 1 spread: discuss outliers, re-vote.',
        'Round 2 minor spread (adjacent cards, e.g. 5 and 8): agree on a value — many teams take the higher card when uncertainty is the reason for the spread.',
        'Round 2 major spread (e.g. 3 and 13): park the story, capture the open question, and either split it or send it back to refinement.',
        'Never exceed three rounds on one story during sprint planning.',
      ],
    },
    {
      title: '7. Split Large Stories',
      content: 'A story that lands on 13 or above is a signal, not a result. Large estimates hide large uncertainty: nobody can really tell whether "13" means eight days or eighteen. Splitting into smaller, independently valuable slices produces more accurate estimates and gives the team earlier feedback during the sprint.',
      paragraphs: [
        'Useful split patterns: by workflow step (upload first, then processing, then notifications), by data variation (support one file format before three), by happy path versus edge cases, or by platform (web before mobile). Avoid splitting by technical layer ("backend story" and "frontend story") when the slices cannot be shipped independently.',
        'Example: "Users can export their reports" comes in at 20. Split into "Export a single report as PDF" (5), "Export a date range as a ZIP of PDFs" (5), and "E-mail the export when it is ready" (3). The total is smaller, and each piece can be demonstrated on its own.',
      ],
    },
    {
      title: '8. Use the ? and Coffee Cards Honestly',
      content: 'Most [planning poker decks](/planning-poker-cards) include two special cards. The question mark means "I do not understand this story well enough to estimate it". The coffee cup means "I need a break". Both are legitimate votes and both carry useful information.',
      paragraphs: [
        'A single "?" in a round should pause the vote until the question is answered. Several "?" cards mean the story is not ready and should go back to refinement rather than being forced to a number. A coffee card from a couple of people after ninety minutes is a reliable sign that the remaining estimates will be worse than the earlier ones — take the break.',
        'Make it socially safe to use these cards. If the team treats "?" as an admission of weakness, people will guess instead, and guesses are exactly what you are trying to eliminate.',
      ],
    },
    {
      title: '9. Time-Box Every Story',
      content: 'Planning poker sessions drift when a single story eats twenty minutes. Set a visible timer per story — three to five minutes is a good default including discussion — and agree in advance what happens when time is up: park the story, note the open question, and continue.',
      paragraphs: [
        'A shared timer works better than the facilitator watching a clock, because everyone can see how much room is left and self-regulate. Online tools with a built-in timer make this painless for distributed teams.',
        'Also time-box the session as a whole. If you regularly need more than two hours to estimate a sprint\'s worth of work, the problem is refinement, not the poker session.',
      ],
    },
    {
      title: '10. Review Estimates Against Reality',
      content: 'Estimation improves through feedback. At the end of each sprint, or during the retrospective, look at the stories that took much longer or much shorter than their points suggested. Ask what the team knew at estimation time and what it learned later.',
      items: [
        'Do certain types of work (integrations, data migrations, UI polish) consistently run over? Adjust the reference stories for that category.',
        'Were the spreads in round one wide for the stories that later surprised the team? That points to weak refinement, not weak estimation.',
        'Did stories parked during the session get resolved before the sprint started?',
        'Keep the round history from your poker tool so you can see each story\'s final votes, not just the agreed number; note the first-round spread yourself when a story needed a re-vote.',
      ],
    },
    {
      title: 'Common Planning Poker Mistakes',
      content: 'Even teams that know the rules fall into a few recurring traps. Watch for these:',
      items: [
        'Averaging the votes. A mean of 3 and 13 is not an estimate; it is a coin flip. Discuss instead.',
        'Letting the Product Owner or manager vote. They own priority and scope, not effort. Spectator mode exists for exactly this reason.',
        'Estimating during the vote instead of before it. Voting should follow a short discussion of what the story is.',
        'Treating points as a commitment or a performance metric. As soon as points are used to judge people, they get inflated.',
        'Re-estimating finished work to "fix" velocity. Velocity is a planning tool, not a score.',
        'Skipping the reveal step in remote sessions and posting numbers in chat, which reintroduces anchoring.',
      ],
    },
    {
      title: 'A Realistic Example Round',
      content: 'Story: "As a customer, I can save a shipping address to my profile so checkout is faster." Acceptance criteria: address form with validation, stored addresses appear in checkout, a maximum of five addresses per user.',
      paragraphs: [
        'Round one reveals 3, 3, 5, 8, 8. The two 8s explain: address validation for international formats is tricky, and the existing checkout has no concept of saved data. One of the 3s replies that the profile page already has a generic form component with validation, and the team agrees international validation is out of scope for this sprint — the Product Owner adds "domestic addresses only" to the story.',
        'Round two reveals 5, 5, 5, 5, 8. The team takes 5, and the 8 voter is comfortable because the international formats are now a separate backlog item. Total time: four minutes. The story is clearer than it was when it arrived, and everybody knows why it is a 5.',
      ],
    },
    {
      title: 'Getting Started',
      content: 'You do not need all ten practices on day one. Start with simultaneous reveal, outlier discussion, and a time-box; add reference stories after a sprint or two; then bring in accuracy reviews once you have some history. If your team is remote or hybrid, a [free browser-based scrum poker tool](/blog/free-scrum-poker-tools) such as Scrum Poker Online gives you hidden votes, a shared timer, and round history without anyone creating an account.',
    },
  ],
  faq: [
    {
      q: 'What is the difference between scrum poker and planning poker?',
      a: 'They are the same technique. "Planning poker" is the original name; "scrum poker" became common because the practice is most often used by Scrum teams during sprint planning and backlog refinement.',
    },
    {
      q: 'How many rounds of voting should we do per story?',
      a: 'Two rounds is the norm: an initial vote, discussion of outliers, and a second vote. If the second round still disagrees widely, the story is unclear or too large — park it and split or refine it instead of voting a third time.',
    },
    {
      q: 'Should the Product Owner or Scrum Master vote in planning poker?',
      a: 'Usually not. The people who will do the work estimate the work. The Product Owner explains the story and answers questions; the Scrum Master facilitates. Both can join as spectators so they see the votes without influencing them.',
    },
    {
      q: 'What should we do when estimates never converge?',
      a: 'Persistent disagreement almost always means the story hides an unresolved question — an unknown dependency, an ambiguous requirement, or two different mental models of the solution. Write the question down, send the story back to refinement, and estimate it once the question is answered.',
    },
    {
      q: 'Can we use planning poker for bugs and technical tasks?',
      a: 'Yes, as long as the item is understood well enough to estimate. Many teams estimate bugs only when the cause is known, and treat investigation as a time-boxed spike rather than a pointed story.',
    },
  ],
};

export default en;
