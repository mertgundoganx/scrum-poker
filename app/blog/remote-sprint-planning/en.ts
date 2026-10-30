import type { Localized } from '../articleTypes';

const en: Localized = {
  title: 'How to Run Sprint Planning Remotely: A Practical Guide',
  subtitle: 'A step-by-step playbook for distributed Scrum teams: preparation, agenda, estimation, time zones, engagement, and the mistakes that quietly ruin remote planning sessions.',
  sections: [
    {
      title: 'Why Remote Sprint Planning Is Different',
      content: 'Sprint planning is the Scrum event where the team decides what it will deliver in the next sprint and how. It is the most collaborative meeting in the framework: the Product Owner brings priorities, the developers bring effort estimates and technical judgment, and together they negotiate a realistic sprint goal. In a shared room, much of that negotiation happens through glances, side conversations, and a whiteboard. Remote sprint planning has none of that for free — every signal has to be made explicit through tools and facilitation.',
      paragraphs: [
        'The good news is that distributed teams that plan deliberately often end up with better sessions than co-located teams that rely on habit. Written preparation replaces hallway context, private online voting removes some social pressure, and a recorded history of decisions is simply a by-product of working in the browser. This guide walks through how to get there.',
        'It is written for Scrum Masters, Product Owners, and team leads running sprint planning over video calls, whether the team is fully remote, hybrid, or spread across several time zones.',
      ],
    },
    {
      title: 'Before the Meeting: A Remote Preparation Checklist',
      content: 'Remote sessions punish poor preparation much harder than in-person ones. When someone opens a story for the first time on a video call, ten people sit silently while they read. Do the reading beforehand, and use a [sprint planning checklist](/blog/sprint-planning-checklist) so nothing slips.',
      items: [
        'Refine the top of the backlog at least two or three days before planning. Each candidate story needs a clear description, acceptance criteria, and known dependencies.',
        'Share the candidate list in writing 24 hours ahead, with a note on the proposed sprint goal.',
        'Ask team members to post questions on the stories asynchronously so the Product Owner can answer before the call.',
        'Confirm capacity: holidays, on-call duty, part-time availability. Write the number down; do not guess it live.',
        'Have the candidate stories ready to paste into the poker room\'s queue, one per line. Create the room when the call starts and post the link in the call chat right away: real-time rooms such as Scrum Poker Online\'s are deleted about an hour after everyone leaves, so a link saved in the calendar invite only works if the host keeps the room (More menu → Keep this room).',
        'Decide who facilitates, who takes notes, and who keeps time. On a call, these roles do not emerge naturally.',
      ],
    },
    {
      title: 'A Step-by-Step Agenda for a Remote Sprint Planning Session',
      content: 'Keep the session between 60 and 120 minutes depending on sprint length, and follow a visible agenda. A structure that works for most distributed teams:',
      items: [
        '1. Check-in (5 min): quick round of "anything that affects this sprint?" — a sick teammate, an incident, a release date moved.',
        '2. Sprint goal (10 min): the Product Owner proposes the goal; the team asks clarifying questions until everyone can restate it in one sentence.',
        '3. Capacity (5 min): confirm the number written down during preparation and adjust for anything from the check-in.',
        '4. Estimation (30–60 min): walk the candidate stories in priority order with planning poker. Vote, discuss outliers, re-vote, record; see [how to run a scrum poker session](/guide) for each step.',
        '5. Commitment (10 min): compare the total against capacity and recent velocity; drop or split until the plan is realistic.',
        '6. Task breakdown (optional, 15–30 min): for the first few stories, sketch tasks so work can start immediately.',
        '7. Wrap-up (5 min): restate the sprint goal, list open questions and their owners, and confirm where the record lives.',
      ],
    },
    {
      title: 'Use a Dedicated Planning Poker Tool, Not Chat or a Spreadsheet',
      content: 'The most common remote estimation mistake is voting in the chat window. The first person to type "5" anchors everyone else, late responders get pressured, and there is no record afterwards. Screen-sharing a spreadsheet has the same problem with more friction.',
      paragraphs: [
        'A browser-based planning poker tool solves this properly. Everyone opens the same room, picks a card privately, and all votes are revealed at once. Scrum Poker Online is a free option that needs no sign-up: the facilitator [creates a planning poker room](/), shares a code or QR invite, and the team is voting within a minute. A story queue keeps the backlog order visible, a shared timer keeps discussion honest, and the round history can be downloaded as CSV or copied as Markdown when the session ends.',
        'If you are still [choosing a free planning poker tool](/blog/free-scrum-poker-tools), make sure it runs alongside the video call rather than replacing it. Voting happens in the tool; discussion happens face to face on camera.',
      ],
    },
    {
      title: 'Beat Anchoring Bias and Silent Conformity',
      content: 'Anchoring bias is the tendency to let the first number heard shape all subsequent estimates. It is a problem in every planning session, but remote settings make it worse: people cannot read the room, so they follow whoever spoke first, and muting makes it easy to stay quiet instead of disagreeing.',
      items: [
        'Hidden votes with a simultaneous reveal are non-negotiable. This is the whole reason planning poker exists.',
        'Ask the Product Owner and any managers to join as spectators. They can watch without a card, which removes a subtle source of pressure.',
        'After the reveal, call on the highest and lowest voters by name. On a call, "anyone want to explain?" is usually met with silence.',
        'Treat the "?" card as a valid answer and a prompt to clarify the story, not as a failure.',
        'Use a nudge feature or a direct message for someone who has not voted, rather than announcing it to the whole call.',
      ],
    },
    {
      title: 'Handling Time Zones: Synchronous, Asynchronous, or Both',
      content: 'A team spread across two or three hours of difference can usually find a shared window. A team spread across eight or more hours cannot hold a full session live without someone working in the middle of the night every sprint. Match the format to the overlap you actually have.',
      paragraphs: [
        'With reasonable overlap, protect that window ruthlessly for planning and refinement, and rotate the inconvenient slot so the same region does not always pay for it. Record the session and publish notes the same day for anyone who missed it.',
        'With little or no overlap, split the work. Do the preparation asynchronously: the Product Owner posts the refined stories and everyone reads them and adds questions during their own working day. Then estimate live in the short overlap, even with only the people who can make it, and spend the time on the stories that need discussion. Real-time tools such as Scrum Poker Online need everyone in the room at the same time; they are not built for votes spread over a day. Commitment and the sprint goal discussion still benefit from a live conversation, even if it is a 30-minute call with two or three representatives.',
      ],
      items: [
        'Low-risk, well-understood stories: settle questions in writing beforehand so each takes one quick round in the live window.',
        'Stories with open questions, new technology, or cross-team dependencies: reserve for the live window.',
        'Always publish the final estimates and the sprint goal in writing where the whole team works, not only in the call.',
      ],
    },
    {
      title: 'Keep Engagement High on a Long Video Call',
      content: 'Remote planning sessions lose energy faster than in-person ones because every participant is also one click away from e-mail. Engagement is a facilitation problem, and there are practical fixes.',
      items: [
        'Cameras on for the discussion parts, off during quiet reading. Say this explicitly so nobody feels judged.',
        'Take a five-minute break every 45 minutes. Watch for coffee cards — they are a signal, not a joke.',
        'Give everyone a job: someone reads the story aloud, someone tracks open questions, someone watches the timer.',
        'Use the built-in team chat for side notes and links so the audio channel stays clear for decisions.',
        'Celebrate quick consensus rounds out loud. It sounds trivial, but a bit of momentum keeps people present.',
        'End on time. A session that regularly runs over trains people to disengage early.',
      ],
    },
    {
      title: 'Facilitation Tips for the Scrum Master',
      content: 'On a call, the facilitator does more than in a room: they manage turn-taking, silence, and the tool at the same time. A few habits make a large difference.',
      paragraphs: [
        'Read each story title aloud before the vote and ask the Product Owner for a 60-second summary, even if everyone read it beforehand — it aligns the group and gives latecomers context. Start the timer at the reveal, not at the summary. When discussion drifts into solution design, say so, capture the design question in the notes, and return to the estimate.',
        'Watch for people who have not spoken in twenty minutes and invite them by name. Watch for the same two people explaining every outlier; if that happens, ask a third voter what they think before opening the floor. And keep the story queue visible so everyone can see how much is left — pacing is easier when the finish line is on screen.',
      ],
    },
    {
      title: 'Document and Follow Up',
      content: 'A remote session that ends without a written record did not really happen. Within an hour of wrap-up, publish a short summary where the team already works.',
      items: [
        'Sprint goal, in one sentence.',
        'Committed stories with their final estimates — copy the round history from the poker tool rather than retyping it.',
        'Stories that were parked, with the open question and an owner.',
        'Capacity assumptions and any known risks.',
        'A link to the recording, if there is one.',
      ],
    },
    {
      title: 'Common Remote Sprint Planning Mistakes',
      content: 'These are the failure modes that show up most often in distributed teams, and they are all avoidable.',
      items: [
        'Refining during planning. If the team is still asking "what does this story mean?", the session is a refinement meeting in disguise.',
        'Voting in chat or by unmuting one at a time, which reintroduces anchoring.',
        'Letting the loudest connection win. The person with the best microphone and the fastest internet is not necessarily the person with the best estimate.',
        'Committing to more than capacity because "we will make it work" — remote teams have fewer informal ways to recover mid-sprint.',
        'Skipping the record. Without notes, people in other time zones start the sprint with a different picture of the plan.',
        'Holding one three-hour meeting instead of two shorter ones. Fatigue makes the last hour worthless.',
      ],
    },
    {
      title: 'Example: A 90-Minute Remote Session for a Two-Week Sprint',
      content: 'Team of seven, split between Istanbul and Berlin, one hour apart in summer and two in winter. Refinement happened on Tuesday; planning is Thursday at 10:00 Istanbul time.',
      paragraphs: [
        'Check-in reveals that one developer is on leave for the second week and another has two days of on-call duty, so capacity drops from 70 to 63 person-days. The Product Owner proposes the goal "Customers can manage saved addresses" and the team restates it. The twelve candidate stories are pasted into the poker room\'s queue in priority order. The first six converge in one round each. Story seven — "Validate international address formats" — reveals 3, 5, 8, 8, 13; the 13 explains that the postal-code rules vary by country and need a data source, and the team agrees to park it and split it after the call. Stories eight through eleven take two rounds each. Story twelve, an 8, would take the total to 34 points against a recent velocity of 31, with capacity down a tenth this sprint, so the team drops it and commits to 26 points.',
        'The wrap-up takes four minutes: goal restated, ten stories committed, one parked with an owner, round history copied into the sprint page. Total time: 88 minutes, with one break.',
      ],
    },
    {
      title: 'A Lightweight Remote Planning Stack',
      content: 'You do not need a heavy toolchain. A small, reliable set is easier to keep everyone on than a large one:',
      items: [
        'A video call for discussion, with a standing link that never changes.',
        'A browser-based planning poker tool with hidden votes, a story queue, a shared timer, and exportable history — Scrum Poker Online covers this for free, with no account needed.',
        'Your backlog tool of choice for the source of truth on stories and priorities.',
        'A shared document space for the sprint summary and open questions.',
      ],
    },
  ],
  faq: [
    {
      q: 'How long should remote sprint planning take?',
      a: 'The Scrum Guide caps sprint planning at eight hours for a one-month sprint, and shorter sprints usually need less. Remote sessions tire people faster, so many teams aim for about one hour per week of sprint — around two hours for a two-week sprint — and split anything longer into two sessions. If sessions regularly run long, the backlog is usually not refined enough before the meeting.',
    },
    {
      q: 'Can sprint planning be done asynchronously?',
      a: 'Partly. Preparation works well asynchronously: stories are posted, and everyone reads them and adds questions in their own working hours. The voting itself works best live, and real-time tools such as Scrum Poker Online need everyone in the room at once, so keep a short shared window for estimation. Agreeing on the sprint goal and the final commitment also works best in a live conversation, even a brief one.',
    },
    {
      q: 'What is the best free tool for remote planning poker?',
      a: 'Look for hidden votes with a simultaneous reveal, no sign-up so guests can join instantly, a story queue, a timer, and a way to export results. Scrum Poker Online meets those requirements and is free with no account required; the right choice for your team is the one everyone will actually open.',
    },
    {
      q: 'Should the Product Owner vote in remote planning poker?',
      a: 'No. The Product Owner explains the stories and answers questions; the developers who will do the work estimate it. Most tools offer a spectator mode so the Product Owner can watch the reveal without holding a card.',
    },
    {
      q: 'How do we handle team members who cannot attend the live session?',
      a: 'Let them post their questions and concerns on the stories before the call, record the session, and publish a written summary the same day. If the same people miss every session because of time zones, rotate the meeting slot so the inconvenience is shared.',
    },
  ],
};

export default en;
