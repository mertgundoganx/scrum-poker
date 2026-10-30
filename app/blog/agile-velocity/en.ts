import type { Localized } from '../articleTypes';

const en: Localized = {
  title: "Agile Velocity: How to Calculate, Track and Use It for Sprint Planning",
  subtitle: "What velocity actually measures, how to calculate it correctly, a worked example with real arithmetic, and the mistakes that turn a useful planning number into a harmful one.",
  sections: [
    {
      title: "What is agile velocity?",
      content: "Agile velocity is the amount of work a Scrum team finishes in a single sprint, measured in the same unit the team uses to estimate — usually [story points instead of hours](/blog/story-points-vs-hours). If a team closes user stories worth 30 points in a two-week sprint, its velocity for that sprint is 30. Averaged over several sprints, velocity becomes the team's most practical planning number: it tells you roughly how much backlog the team can pull into the next sprint and how many sprints a release is likely to take.",
      paragraphs: [
        "Two things make velocity different from the productivity metrics most managers are used to. First, it is team-level, never individual: story points are assigned to a story, and the story is delivered by the team. Second, it is relative. A point has no fixed meaning outside the team that estimated it, so velocity only makes sense in the context of that team's own history.",
        "Velocity is an empirical measure, not a target. It describes what happened, and the only thing it is good for is projecting what is likely to happen next if conditions stay similar. As soon as a team is pushed to “increase velocity”, the number stops describing reality and starts describing pressure.",
      ],
    },
    {
      title: "How to calculate velocity step by step",
      content: "The calculation itself is simple. The discipline is in what you count.",
      items: [
        "1. At the end of the sprint, list every backlog item the team pulled into the sprint.",
        "2. Keep only the items that fully meet your Definition of Done — reviewed, tested, merged, deployable, or whatever your team has agreed. An item that is 90% finished counts as zero for this sprint; its points move to the sprint in which it is actually finished.",
        "3. Add up the story points of the completed items. That total is the sprint's velocity.",
        "4. Repeat for every sprint and record the numbers somewhere the whole team can see them.",
        "5. After three to five sprints, compute the average, or a rolling average of the most recent sprints. That is the velocity you use for planning.",
      ],
      paragraphs: [
        "Do not re-estimate stories after they are done to make the number look better, and do not award partial credit. Both practices feel harmless in the moment, but they make the historical numbers unreliable, which defeats the only purpose velocity has.",
      ],
    },
    {
      title: "Worked example: six sprints of velocity",
      content: "Suppose a newly formed team runs two-week sprints and records the following results over its first six sprints. These numbers are invented for illustration.",
      items: [
        "Sprint 1: committed 30 points, completed 22 (two stories carried over)",
        "Sprint 2: committed 30 points, completed 31 (the carry-over finished early)",
        "Sprint 3: committed 32 points, completed 28",
        "Sprint 4: committed 30 points, completed 35",
        "Sprint 5: committed 34 points, completed 26 (one developer on leave for a week)",
        "Sprint 6: committed 30 points, completed 32",
      ],
      paragraphs: [
        "The average of all six sprints is (22 + 31 + 28 + 35 + 26 + 32) / 6 = 174 / 6 = 29 points. The rolling average of the last three sprints is (35 + 26 + 32) / 3 = 93 / 3 = 31 points. Both are reasonable planning numbers. The more important observation is that the team completes somewhere between about 26 and 35 points in a normal sprint, and that this range — not any single sprint — is the reality you should plan around.",
        "Now suppose the Product Owner asks how long the remaining 180 points in the release backlog will take. Using the six-sprint average of 29 points, 180 / 29 is about 6.2, so roughly seven sprints. Using the low end of the range (26 points), 180 / 26 is about 6.9, so seven sprints. Using the high end (35 points), 180 / 35 is about 5.1, so six sprints. A responsible forecast is therefore “six to seven sprints, most likely seven”, communicated as a range rather than a date.",
      ],
    },
    {
      title: "Using velocity for sprint planning and release forecasting",
      content: "During [sprint planning](/blog/sprint-planning-checklist), velocity is the ceiling on how much the team should pull in, not a quota to fill. With a planning velocity of around 30 points, the team selects the highest-priority stories from the refined backlog until the total is close to 30, then stops — even if the sprint feels light.",
      paragraphs: [
        "Adjust for known capacity changes before you pick stories. If two of six developers are on holiday for half the sprint, the team is missing roughly one sixth of its capacity and should plan for about 25 points rather than 30. Velocity gives you the baseline; capacity planning adjusts it for the specific sprint ahead.",
        "Velocity also feeds release planning. Dividing the remaining backlog points by the average velocity gives you an expected number of sprints, and dividing by the lowest and highest recent velocities gives you a pessimistic and an optimistic bound. Presenting all three is far more honest than presenting one date, and it makes scope negotiations with stakeholders concrete: if the date is fixed, the range tells you how many points need to leave the backlog.",
      ],
    },
    {
      title: "Why velocity changes over time",
      content: "Velocity is never a flat line, and it should not be. A few points of sprint-to-sprint variation is noise. Larger or sustained shifts usually have an identifiable cause worth discussing in the retrospective.",
      items: [
        "Team composition: a new member typically lowers velocity for a few sprints while they learn the codebase, and losing a senior engineer can lower it for longer.",
        "Sprint length: switching from two-week to three-week sprints changes the number itself. Compare velocity only across sprints of the same length.",
        "Estimation drift: if the team gradually starts calling 5-point stories 8-point stories, velocity rises with no change in output. Reference stories help keep the scale stable.",
        "Work mix: a sprint heavy on unestimated bugs, incidents or support will show a lower velocity even if the team worked just as hard.",
        "Technical change: adopting a new framework, migrating infrastructure or paying down a large chunk of technical debt temporarily reduces the points delivered.",
        "Interruptions: releases, all-hands weeks, public holidays and onboarding all reduce the time available for planned work.",
      ],
      paragraphs: [
        "Because of these factors, most teams plan using a rolling average of the last three to five sprints rather than the most recent sprint alone. The rolling average reacts to genuine change while damping the noise from a single unusual sprint.",
      ],
    },
    {
      title: "Common velocity mistakes and anti-patterns",
      content: "Velocity is misused far more often than it is used well. The following patterns show up in almost every organization that adopts it without understanding what it measures.",
      items: [
        "Comparing velocity across teams. Two teams estimating with different scales are measuring different things; a team with velocity 60 is not twice as effective as one with velocity 30. The comparison is meaningless, and once teams know they are being compared, points inflate.",
        "Using velocity as a performance metric. Rewarding higher velocity is the fastest way to destroy it. Estimates grow, the Definition of Done shrinks, and the number stops predicting anything.",
        "Setting velocity targets. “We need to hit 40 this quarter” turns a measurement into a goal, and a goal that can be met by changing the estimates will be met by changing the estimates.",
        "Counting partially done work. Awarding 5 of 8 points for a story that is “almost done” hides carry-over and inflates the trend.",
        "Planning to the best sprint. Committing to the highest velocity the team ever achieved guarantees regular sprint failure.",
        "Tracking individual velocity. Story points belong to the team. Individual velocity encourages people to avoid pairing, reviewing and helping — precisely the behavior that makes teams fast.",
      ],
    },
    {
      title: "When velocity helps and when it misleads",
      content: "Velocity is at its best when a stable team has been estimating the same way for at least a handful of sprints and needs a realistic answer to the question “how much can we take on?”. In that setting it is simple, cheap and considerably more honest than gut feeling.",
      paragraphs: [
        "It misleads when the conditions it depends on are missing. A brand-new team has no history to average. A team whose members change every sprint has no stable unit of measure. A team that mixes unestimated operational work into every sprint will see wild swings that have nothing to do with planning quality. And a team under pressure to show improvement will, consciously or not, drift its estimates until the chart looks the way management wants.",
        "Velocity also says nothing about value. A sprint that delivers 35 points of low-priority features is not better than one that delivers 20 points that unblock a major customer. Pair velocity with outcome measures — goals met, customer problems solved, incidents reduced — and treat it strictly as a capacity signal.",
      ],
    },
    {
      title: "Consistent estimation keeps velocity meaningful",
      content: "Velocity is only as good as the estimates behind it. If a story is estimated at 3 one week and a similar story at 8 the next, the resulting velocity swings tell you nothing. The purpose of Planning Poker in this picture is not precision; it is consistency. When every team member estimates independently against the same reference stories and then discusses the differences, the team's [Fibonacci point scale](/fibonacci-planning-poker) stays stable from sprint to sprint.",
      paragraphs: [
        "The mechanics matter. Estimates should be hidden until everyone has chosen, so that the first number spoken does not anchor the rest. Scrum Poker Online is a free tool for this: there is no sign-up, votes stay hidden until the simultaneous reveal, and the round history keeps each story's final votes, which you can download as CSV or copy as Markdown. That history is also a useful input when the retrospective asks why velocity moved.",
      ],
    },
    {
      title: "Velocity checklist",
      content: "Use this checklist to confirm your velocity is worth planning with.",
      items: [
        "The team has completed at least three sprints of the same length with mostly stable membership.",
        "Only items meeting the Definition of Done are counted; no partial credit, no retroactive re-estimation.",
        "Unplanned work is handled the same way in every sprint — always estimated or never estimated.",
        "Velocity per sprint is recorded and visible, including the committed-versus-completed gap.",
        "Planning uses a rolling average of the last three to five sprints, adjusted for known capacity changes.",
        "Forecasts are communicated as a range of sprints, not a single date.",
        "Nobody outside the team uses the number to compare teams, rank people or set targets.",
        "The team periodically re-checks a few reference stories to catch estimation drift.",
      ],
    },
  ],
  faq: [
    {
      q: "What is a good velocity for a Scrum team?",
      a: "There is no universal good velocity. The number depends on how the team assigns points, how long its sprints are and how many people it has, so 20 can be excellent for one team and 80 ordinary for another. A good velocity is simply one that is stable enough to plan with: if the last five sprints fall within a narrow range, the team can forecast with confidence, whatever the absolute number.",
    },
    {
      q: "How many sprints do you need before velocity is reliable?",
      a: "Most teams get a usable average after three sprints and a fairly stable one after five or six, provided the team membership and sprint length stay the same. Until then, plan conservatively, treat the number as provisional, and expect to adjust it.",
    },
    {
      q: "Should bugs and technical debt count toward velocity?",
      a: "Either choice is fine as long as it is consistent. If you estimate bugs and technical debt items and count them, velocity reflects total delivered work. If you leave them unestimated, velocity reflects feature work only and will look lower in bug-heavy sprints. The mistake is switching between the two approaches, which makes sprints incomparable.",
    },
    {
      q: "Does a higher velocity mean the team is improving?",
      a: "Not necessarily. Velocity rises when the team genuinely delivers more, but it also rises when estimates inflate, when the Definition of Done is relaxed, or when sprints get longer. Check estimation consistency and the quality of what shipped before reading a rising line as improvement.",
    },
    {
      q: "What is the difference between velocity and capacity?",
      a: "Velocity is a historical measure: the points the team actually completed per sprint. Capacity is a forward-looking measure: the people and days available for a specific upcoming sprint. Use velocity as the baseline and adjust it for capacity when holidays, on-call duty or other absences make the coming sprint different from a typical one.",
    },
  ],
};

export default en;
