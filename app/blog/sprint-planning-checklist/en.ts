import type { Localized } from '../articleTypes';

const en: Localized = {
  title: "Sprint Planning Checklist: 12 Steps to a Successful Planning Meeting",
  subtitle: "What to prepare before the meeting, what to decide in the room and what to write down afterwards — a step-by-step sprint planning checklist for Scrum teams, with a worked example.",
  sections: [
    {
      title: "What is sprint planning?",
      content: "Sprint planning is the meeting that opens every sprint. The Scrum team looks at the prioritized product backlog, agrees on a sprint goal, selects the backlog items it believes it can finish, and works out how it will deliver them. The output is the sprint backlog: the goal, the selected items and an initial plan for the work.",
      paragraphs: [
        "The Scrum Guide time-boxes sprint planning to a maximum of eight hours for a one-month sprint and notes that the event is usually shorter for shorter sprints; most teams on two-week sprints finish in two to four hours. The meeting answers three questions: why is this sprint valuable, what can be done, and how will the work get done. Every step in the checklist below serves one of those three questions.",
      ],
    },
    {
      title: "Before the meeting: steps 1 to 4",
      content: "Preparation happens in backlog refinement during the previous sprint, not in the planning meeting itself. If the following four steps are done, planning becomes a decision-making session rather than a discovery session.",
      items: [
        "1. Refine the top of the backlog. The Product Owner and the developers have discussed the highest-priority items, each has a clear description and testable acceptance criteria, and items too large for one sprint have been split.",
        "2. Estimate the candidate items. Anything that might enter the sprint has a story point estimate agreed by the team. If a few items are still unestimated, schedule a short estimation round at the start of planning rather than estimating ad hoc in the middle.",
        "3. Know your velocity and your capacity. Calculate the average of the last three to five sprints, and collect who is available in the coming sprint — holidays, training, on-call duty, part-time days.",
        "4. Draft a sprint goal. The Product Owner brings a proposed goal tied to a business outcome. It will be adjusted in the meeting, but starting from a draft keeps the discussion focused.",
      ],
    },
    {
      title: "Step 5: agree on the sprint goal",
      content: "Start the meeting with the goal, not with the list of tickets. The sprint goal is a one-sentence statement of what the sprint should achieve — “customers can pay with a saved card” rather than “finish tickets 231 to 244”. It gives the team a reason to collaborate and a basis for trade-offs: when something slips, items that do not serve the goal are the first to be dropped.",
      paragraphs: [
        "A good goal is specific enough that you can tell whether you reached it, and broad enough that the team can choose how to reach it. If the proposed items serve three unrelated goals, either pick one or acknowledge that the sprint has no single goal and accept the loss of focus that comes with that.",
      ],
    },
    {
      title: "Step 6: confirm capacity for this sprint",
      content: "[Your team's velocity](/blog/agile-velocity) tells you what the team delivered in a typical past sprint. Capacity tells you whether the coming sprint is typical. Compare the two before selecting a single item.",
      paragraphs: [
        "Suppose the average velocity is 30 points and the team has six developers. In the coming sprint one developer is on leave for the whole sprint and another is out for half of it, so the team is missing one and a half of six developer-sprints — a quarter of its usual capacity. Planning around 22 or 23 points rather than 30 is the honest starting point. Also subtract known non-sprint commitments such as a release day, a company event or a heavy on-call rotation.",
      ],
    },
    {
      title: "Steps 7 and 8: select and verify backlog items",
      content: "With the goal and the capacity agreed, pull items from the top of the backlog until the total points approach the capacity number. Stop there, even if the sprint feels light; it is far better to pull in an extra item mid-sprint than to carry over three.",
      items: [
        "7. Select items in priority order that serve the goal. Skipping a high-priority item because it is inconvenient is a decision for the Product Owner to make explicitly, not a default.",
        "8. Verify each item before accepting it: it fits in one sprint, its acceptance criteria are testable, its dependencies on other teams or systems are resolved or explicitly accepted as a risk, someone on the team has the skills to do it, and any design or architecture input it needs is already available.",
      ],
      paragraphs: [
        "An item that fails any check goes back to refinement. Pulling it in “because we will figure it out” is how sprints end with half-finished work.",
      ],
    },
    {
      title: "Step 9: estimate what is not yet estimated",
      content: "If some candidate items lack estimates, run a short Planning Poker round for them now. Keep it tight: read the item, ask clarifying questions, everyone chooses a card privately, reveal simultaneously, and let the highest and lowest voters explain if the spread is wide; the guide on [how to run a scrum poker session](/guide) walks through each step. Time-box each item to a few minutes; if it cannot be estimated in that time, it is not ready and should not enter the sprint.",
      paragraphs: [
        "Simultaneous reveal is one of the core [scrum poker best practices](/blog/scrum-poker-best-practices), because the first number spoken out loud pulls everyone else toward it. With Scrum Poker Online you can [start a free planning poker room](/) and run these rounds without sign-up: votes stay hidden until the round is revealed, and the round history keeps each item's final votes for downloading as CSV or copying as Markdown. Make your own note of which items needed a second vote — a useful signal for the next refinement session.",
      ],
    },
    {
      title: "Steps 10 and 11: break down the work and commit",
      content: "Once the items are selected, the developers plan how to deliver them. This part of the meeting belongs to the developers; the Product Owner stays available for questions but does not direct the technical plan.",
      items: [
        "10. Break at least the first few items into tasks small enough to finish in a day or less. Task breakdown regularly uncovers hidden complexity — a migration, a missing API, an unclear edge case — while there is still time to swap an item out.",
        "11. Make the commitment explicit. Ask the team directly whether they believe the sprint goal is achievable with the selected items and the known capacity. A hesitant yes is a no; remove something.",
      ],
    },
    {
      title: "Step 12: after the meeting",
      content: "The meeting produces decisions; the sprint backlog makes them real. Within an hour of finishing, the following should be true.",
      items: [
        "12. The sprint backlog is written down: the sprint goal is visible in the tool and on whatever board the team uses, the selected items are moved into the sprint with their estimates, tasks are recorded, capacity assumptions are noted, and any risk or dependency raised in the meeting has an owner.",
        "The team knows which item to start first and, ideally, has started it the same day.",
        "Anything pushed back to refinement has been flagged to the Product Owner so it is ready next time.",
      ],
    },
    {
      title: "Worked example: a two-hour planning session",
      content: "Here is how the twelve steps look in practice for a hypothetical team of five developers running two-week sprints, with an average velocity of 28 points. The numbers are invented for illustration.",
      items: [
        "0:00–0:10 — The Scrum Master confirms capacity. Everyone is available except one developer who is at a two-day conference, so the team plans for about 26 points instead of 28.",
        "0:10–0:25 — The Product Owner presents the draft goal, “new users can complete onboarding without opening a support ticket”, and the top twelve refined items. The team asks questions and tightens the goal wording.",
        "0:25–0:40 — Three items lack estimates. A quick Planning Poker round sizes them at 3, 5 and 8, with one re-vote on the 8.",
        "0:40–1:10 — The team pulls items in priority order: 5, 3, 8, 5 and 3, for 24 points. The next item is an 8 that would take the total to 32, so it stays in the backlog and a 1-point item further down is pulled instead, bringing the sprint to 25 points.",
        "1:10–1:50 — The developers break the first four items into tasks. One of the 5-point items turns out to depend on an unreleased API from another team; it is swapped for another 5-point item further down the backlog, which keeps the sprint at 25 points.",
        "1:50–2:00 — The team confirms the commitment, the sprint backlog is updated in the tool, and the goal is posted in the team channel.",
      ],
      paragraphs: [
        "Nothing in this session is remarkable, and that is the point. Because refinement happened earlier, two hours were enough to make every decision with the whole team in the room.",
      ],
    },
    {
      title: "Common sprint planning mistakes",
      content: "These patterns show up repeatedly in teams whose planning meetings run long or whose sprints end with unfinished work.",
      items: [
        "Refining in the meeting. If the team is writing acceptance criteria during planning, the meeting takes twice as long and the estimates are guesses.",
        "Planning to velocity without checking capacity. Thirty points is not a plan for a sprint in which two people are away.",
        "Filling the sprint. Treating the velocity number as a quota to be met rather than a ceiling leads to routine carry-over.",
        "No sprint goal. When every item is equally important, the team cannot decide what to drop when reality intervenes.",
        "Estimates from one person. A lead announcing sizes anchors everyone else and hides the disagreements that reveal risk.",
        "Product Owner absent or unprepared. Without priorities and answers in the room, the team either guesses or waits.",
        "Skipping the explicit commitment. A sprint nobody agreed to is a sprint nobody owns.",
      ],
    },
    {
      title: "When this checklist helps and when it gets in the way",
      content: "The checklist is most valuable for teams whose sprints regularly end with unfinished work, whose planning meetings run past their time-box, or who have recently changed membership or tooling. It turns planning from a conversation that depends on the memory of one experienced person into a repeatable routine.",
      paragraphs: [
        "It is less useful for very mature teams that already refine continuously and plan in thirty minutes; for them, running all twelve steps ceremonially adds overhead without insight. Treat the steps as a diagnostic: if you can skip one because it is already true, skip it. And remember that a checklist can confirm acceptance criteria exist; it cannot confirm they are good.",
      ],
    },
    {
      title: "Sprint planning checklist: the 12 steps on one page",
      content: "The twelve steps in a form you can paste into your team wiki.",
      items: [
        "1. Top backlog items refined, with acceptance criteria",
        "2. Candidate items estimated",
        "3. Velocity and capacity known",
        "4. Draft sprint goal prepared",
        "5. Sprint goal agreed",
        "6. Capacity adjusted for this sprint",
        "7. Items selected in priority order, within capacity",
        "8. Each item verified: fits, testable, dependencies handled, skills present",
        "9. Unestimated items sized with simultaneous-reveal Planning Poker",
        "10. Work broken into day-sized tasks",
        "11. Explicit team commitment to the goal",
        "12. Sprint backlog written down and communicated",
      ],
    },
  ],
  faq: [
    {
      q: "How long should sprint planning take?",
      a: "The Scrum Guide sets a maximum of eight hours for a one-month sprint; for shorter sprints the event is usually shorter. Teams on two-week sprints usually need two to four hours. If your meetings run longer, the cause is almost always refinement happening in the meeting instead of before it.",
    },
    {
      q: "Who should attend sprint planning?",
      a: "The whole Scrum team: the Product Owner, the developers and the Scrum Master. Stakeholders or subject-matter experts can join the opening part to provide context, but the selection and the plan belong to the team. The Product Owner must be present; planning without priorities and answers in the room is guesswork.",
    },
    {
      q: "What is the difference between backlog refinement and sprint planning?",
      a: "Refinement is the ongoing activity of clarifying, splitting and estimating backlog items so they are ready to be worked on. Sprint planning is the event where the team selects ready items for the coming sprint and plans how to deliver them. Refinement prepares the menu; planning places the order.",
    },
    {
      q: "Should we plan based on velocity or on capacity?",
      a: "Both. Velocity gives you the baseline — what the team typically completes. Capacity adjusts that baseline for the specific sprint ahead, accounting for holidays, on-call duty and other absences. Planning on velocity alone ignores the coming sprint's reality; planning on capacity alone ignores the team's history.",
    },
    {
      q: "What if the team cannot agree on a sprint goal?",
      a: "That usually means the top of the backlog is not focused: it contains items serving several unrelated outcomes. The Product Owner decides which outcome has priority and the goal follows from it. If the sprint genuinely must serve two outcomes, name a primary goal and treat the second as a stretch, so the team knows what to protect when time runs short.",
    },
  ],
};

export default en;
