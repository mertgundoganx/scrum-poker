import type { Localized } from '../articleTypes';

const en: Localized = {
  title: 'Story Points vs Hours: Which Should Your Agile Team Use?',
  subtitle: 'What story points measure, why hour estimates keep failing in sprints, how to answer "but management wants dates", and when hours are still the right call.',
  sections: [
    {
      title: 'Story points vs hours: the short answer',
      content: 'Estimate backlog items in story points and derive dates from velocity. Use hours only for work with a fixed, well-understood scope, for billing, or for the day-level task breakdown inside a sprint if your team finds that useful. Story points describe how big a piece of work is relative to other work; hours describe how long a specific person expects to spend on it. For planning sprints and forecasting releases, the first question is the one that holds up.',
    },
    {
      title: 'What are story points?',
      content: 'A story point is a unit of relative size. When a team says a user story is a 5, it means the story is about as big as other 5s the team has done, bigger than its 3s and smaller than its 8s. The number folds together everything that makes work take effort: the amount of work, its complexity, the uncertainty around it and the risk of surprises.',
      paragraphs: [
        'Story points are deliberately not a unit of time. The same 5-point story might take a senior engineer a day and a new hire three days, but it is still a 5, because the size of the work has not changed. That is exactly what makes points useful: they stay stable when the team’s speed changes, and the speed is measured separately as [team velocity](/blog/agile-velocity).',
        'Most teams use the modified [Fibonacci scale](/fibonacci-planning-poker) popularized by Mike Cohn in "Agile Estimating and Planning" (0, 1, 2, 3, 5, 8, 13, 20, 40, 100), estimated as a group with Planning Poker. The growing gaps between values reflect the fact that big things are harder to size precisely than small things.',
      ],
    },
    {
      title: 'What does estimating in hours actually mean?',
      content: 'An hour estimate is a prediction of elapsed working time for a specific piece of work, usually by a specific person. It is an absolute estimate: "this will take about 6 hours". The appeal is obvious. Hours are universal, everybody understands them, spreadsheets add them up, and managers can compare them to calendars. The problem is that an hour estimate bundles two very different things: the size of the work, which is knowable during refinement, and the productivity of whoever will do it on whatever day they do it, which is not.',
    },
    {
      title: 'Why hour estimates fail in agile teams',
      content: 'Hours look precise, which is precisely the trap. In practice they break down for several reasons:',
      items: [
        'They depend on who does the work. A task that takes one developer 4 hours may take another 12, and until the sprint is planned nobody knows who will pick it up.',
        'They ignore the calendar. Meetings, code review, production incidents and context switching are invisible in a per-task hour estimate but eat a large share of every working day.',
        'They invite false precision. "8 hours" sounds like a measurement. Nobody can distinguish an 8-hour task from a 9-hour task in advance, but the number will be treated as a commitment anyway.',
        'They turn into pressure. When an estimate is a time promise, developers cut corners to hit it or pad the next one.',
        'They do not aggregate cleanly. Adding up 40 task-level hour estimates does not give a reliable sprint duration, because the errors mostly point the same optimistic way.',
      ],
    },
    {
      title: 'Why story points work better for sprint planning',
      content: 'Story points sidestep those failures by separating size from speed:',
      items: [
        'The estimate stays valid when the team changes. A 5 is a 5 whether the senior or the junior takes it. Speed is captured by velocity, which updates automatically each sprint.',
        'Relative questions are easier to answer well. "Is this bigger than the password reset story?" produces consistent answers; "how many hours?" produces guesses that vary with mood and confidence.',
        'Uncertainty has a place. A story with a shaky spec can be given a 13 to say "big and unclear", without pretending anyone knows the hours.',
        'Velocity gives you forecasting for free. After a few sprints the team knows it completes roughly N points per sprint, and that number absorbs meetings, reviews and interruptions because it is measured, not estimated.',
        'Points remove the personal commitment. They describe the work, not a person’s promise, so sessions focus on understanding the story rather than defending a number.',
      ],
    },
    {
      title: 'Story points vs hours: side-by-side comparison',
      content: 'The key differences, criterion by criterion:',
      items: [
        'What it measures: points measure relative size (effort, complexity, uncertainty, risk); hours measure predicted elapsed time for one person.',
        'Stability: a point estimate does not change when a different person takes the story; an hour estimate does.',
        'Forecasting: points forecast via velocity measured over whole sprints; hours forecast by adding up per-task guesses.',
        'Interruptions: absorbed by velocity; ignored by per-task hours unless every task is padded.',
        'Precision: points are coarse by design; hours imply a precision nobody has in advance.',
        'Team dynamics: points are a team estimate of the work; hours become an individual commitment.',
      ],
    },
    {
      title: 'A worked example: the same sprint, estimated both ways',
      content: 'Imagine a five-person team planning a two-week sprint with three stories: a profile-page bug fix, a CSV export of order history, and a new payment-provider integration.',
      paragraphs: [
        'In hours: the tech lead estimates 4, 16 and 40 hours. That is 60 hours against 5 people times 10 days times 8 hours, or 400 hours of capacity, so the sprint looks almost empty and three more stories are pulled in. In reality, meetings and reviews consume a third of the calendar, the export turns out to touch two services, and the payment integration stalls on documentation. The sprint ends with the export half done and the extra stories untouched.',
        'In story points: the team plays Planning Poker and lands on 2, 8 and a "?" that becomes a 3-point spike. Its velocity over the last four sprints averages 25. With 13 points committed there is room for a couple more small stories, and the team knows from history that a 25-point sprint already includes its meetings and reviews. The payment integration is not forced into the sprint on a guess; the spike answers the open questions first. The point estimate is not more precise, but it is calibrated against real delivery instead of ideal working days.',
      ],
    },
    {
      title: 'The "management wants hours" problem: velocity-based forecasting',
      content: 'The most common objection to story points is that a manager, a client or a finance team wants dates and hours, not points. The answer is not to abandon points; it is to translate at the level of sprints instead of stories.',
      paragraphs: [
        'Velocity is the number of points a team completes per sprint, averaged over the last several sprints. Once you have three or four sprints of history, forecasting is arithmetic. If a release is estimated at 120 points and the team averages 25 per sprint, it is roughly five two-week sprints, or about ten weeks. Give a range, not a single date: the lowest and highest velocity in the recent history yield a best case and a worst case that are far more defensible than a total of hour guesses.',
        'What you should not do is publish a fixed points-to-hours ratio ("1 point = 4 hours"). The moment that ratio exists, every point estimate becomes an hour estimate in disguise and all the problems above return.',
      ],
    },
    {
      title: 'When hours are the right choice',
      content: 'Story points are not a universal answer. Hours are reasonable when:',
      items: [
        'The scope is fixed and familiar. A routine certificate rotation or a known configuration change has almost no uncertainty.',
        'You are breaking a story into tasks inside the sprint. Some teams size stories in points and then split them into hour-sized tasks for their own day-to-day tracking. That is fine as long as the hours never feed back into the story-point estimate.',
        'The work is billed by the hour and the client needs a quote. Even here, estimate in points first and convert using velocity, rather than guessing hours per task.',
        'One person does all the work and has done it many times before. Relative estimation adds little without a team to reach consensus with.',
      ],
    },
    {
      title: 'Common mistakes when moving from hours to story points',
      content: 'Teams switching to points tend to bring their hour habits with them. Watch for these:',
      items: [
        'Defining a point as a number of hours. It feels helpful on day one and destroys the benefit permanently.',
        'Comparing velocity between teams. Each team’s points are calibrated to its own reference stories, so 30 points on one team says nothing about another.',
        'Using points as a productivity score. The instant velocity becomes a target, estimates inflate and the metric stops predicting anything.',
        'Skipping the reference story. Without a shared "this is what a 3 looks like", each person silently estimates in hours and rounds to a Fibonacci number.',
        'Letting one person estimate. The value of points comes from the team discussion. A lead assigning points alone gets the downsides of both systems.',
      ],
    },
    {
      title: 'How to estimate in story points with Planning Poker',
      content: 'The standard way to produce story-point estimates is [Planning Poker](/blog/what-is-planning-poker), the technique James Grenning described in 2002 and Mike Cohn popularized. In brief:',
      items: [
        '1. Choose one or two completed stories as references and agree on their sizes, for example "the password reset flow was a 3".',
        '2. The Product Owner presents a story and the team asks clarifying questions for a couple of minutes.',
        '3. Everyone picks a card privately and reveals at the same time, so nobody anchors on the first number spoken.',
        '4. If the cards diverge, the highest and lowest estimators explain what they see, and the team votes again. Most stories converge within two rounds.',
        '5. Record the agreed value. After each sprint, sum the points of the stories that were actually finished; that is the velocity you will forecast with.',
      ],
      paragraphs: [
        'A free tool such as Scrum Poker Online handles the mechanics for remote teams: create a room, share the link, and up to 50 participants can vote with Fibonacci, T-shirt, Powers of 2 or a custom deck without signing up.',
      ],
    },
    {
      title: 'Our recommendation',
      content: 'Estimate in story points, forecast with velocity, and keep hours for the narrow cases where scope is fixed or billing demands them. Start with the Fibonacci scale, pick a well-understood recent story as your reference, and give velocity three or four sprints to settle before you use it for commitments. When stakeholders ask for dates, answer with a sprint range derived from velocity, never with a points-to-hours ratio. Teams that make this switch rarely go back, because they finally separate the size of the work from the speed of the team.',
    },
  ],
  faq: [
    {
      q: 'How many hours is one story point?',
      a: 'There is no fixed answer, and defining one defeats the purpose. Story points measure relative size, not time. The relationship between points and calendar time is captured by velocity, which differs from team to team.',
    },
    {
      q: 'Why do many agile teams avoid estimating in hours?',
      a: 'Because hour estimates depend on who does the work and on interruptions nobody can predict, they create false precision, and they turn into personal commitments. Story points describe the work itself and let velocity account for real-world speed.',
    },
    {
      q: 'Can you use both story points and hours?',
      a: 'Yes. A common pattern is to size stories in points for planning and forecasting, then break them into hour-sized tasks inside the sprint for day-to-day tracking. The hours should never be used to recalculate the story points.',
    },
    {
      q: 'How do I convert story points to a delivery date?',
      a: 'Use velocity. Divide the remaining points by the team’s average points per sprint to get a number of sprints, then multiply by sprint length. Present a range using the lowest and highest recent velocities rather than a single date.',
    },
    {
      q: 'Is a story point the same across different teams?',
      a: 'No. Each team calibrates points against its own reference stories, so a 5 on one team is not comparable to a 5 on another. Velocity should only ever be compared with the same team’s own history.',
    },
  ],
};

export default en;
