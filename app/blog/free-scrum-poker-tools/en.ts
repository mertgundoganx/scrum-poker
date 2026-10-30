import type { Localized } from '../articleTypes';

const en: Localized = {
  title: 'Best Free Scrum Poker Tools: What to Look For',
  subtitle: 'A practical buyer\'s guide to free planning poker tools: the criteria that matter, the categories of tools available, questions to ask before choosing, and how Scrum Poker Online measures up.',
  sections: [
    {
      title: 'Why "Free" Deserves a Closer Look',
      content: 'Searching for a free scrum poker tool returns dozens of options, and most of them describe themselves as free. In practice, "free" covers a wide range: fully free products, free tiers that cap participants or rooms, trials that expire, and open-source projects you host yourself. None of these is wrong, but the differences matter when a team of ten tries to estimate on a Thursday morning and discovers that the tenth seat, the timer, or the export is behind a paywall.',
      paragraphs: [
        'Rather than ranking products by feature lists that change every quarter — and that we cannot independently verify — this guide gives you a stable set of criteria. Use it to evaluate any planning poker tool in about fifteen minutes, including the ones that appear after this article is published.',
        'The short version: pick a tool your whole team can open instantly, that hides votes until the reveal, that supports the deck you actually use, and that lets you keep the results. Everything else is a bonus.',
      ],
    },
    {
      title: 'What Is a Scrum Poker Tool, and Do You Need One?',
      content: 'A scrum poker (planning poker) tool replaces the physical card deck used in estimation sessions. Everyone joins a shared room, the facilitator presents a user story, each participant picks a card privately, and all cards are revealed at once. The tool then shows the spread, often with an average or a suggested estimate, and the team discusses and re-votes if needed.',
      paragraphs: [
        'Co-located teams can get by with physical cards. Remote and hybrid teams cannot: voting in chat or by unmuting one at a time reintroduces anchoring bias, the exact problem [the planning poker technique](/blog/what-is-planning-poker) was designed to remove. If any member of your team joins sprint planning over a video call, a dedicated tool is worth the few minutes it takes to set up.',
      ],
    },
    {
      title: 'The Criteria Checklist: What to Look For in a Free Planning Poker Tool',
      content: 'Run each candidate tool through this list. The first four items are essential; the rest depend on how your team works.',
      items: [
        'No sign-up for participants. Guests should join with a link or room code and a display name. If every developer has to create an account, adoption drops and the first session is spent on onboarding.',
        'Participant limits. Check how many people can be in one room on the free plan, and whether that number covers your largest session — including spectators such as the Product Owner and stakeholders.',
        'Deck types. Modified Fibonacci is the default set of [planning poker card values](/planning-poker-cards), but many teams use T-shirt sizes, powers of two, or a custom sequence. A tool that supports only one deck forces the team to adapt to the tool instead of the other way round.',
        'Hidden votes and simultaneous reveal. This is non-negotiable. Votes must be invisible to everyone until the round is revealed.',
        'Consensus and suggested estimate. After the reveal, the tool should show the distribution clearly and, ideally, highlight agreement or suggest a value so the facilitator does not have to do mental arithmetic.',
        'Team chat. Useful for side notes and links to tickets, so the audio channel stays free for discussion.',
        'Story queue. The ability to load a list of stories and move through them in order keeps the session paced and gives everyone a sense of how much is left.',
        'Shared timer. A per-story time-box visible to everyone is one of the simplest ways to stop a session from running over.',
        'Round history and export. You should be able to see previous rounds and copy the results out — as CSV or similar — into your backlog tool or sprint notes.',
        'Spectator mode. Product Owners, Scrum Masters, and stakeholders need to watch without holding a card.',
        'Privacy and data handling. What is stored, for how long, and where. Rooms that expire and require no personal data are easier to approve in regulated environments.',
        'Mobile support. Some participants will vote from a phone. The card selection and the reveal should work at phone width without pinch-zooming.',
        'Language support. For international teams, an interface available in each member\'s language removes a small but real friction.',
        'Self-hosting and open source. If your organization cannot use external SaaS, an open-source tool you can deploy internally may be the only viable choice. It also lets you inspect exactly what the tool does with your data.',
        'Upsells and interruptions. A free tool that interrupts estimation with pop-ups or repeated upgrade prompts will slow the session and annoy the team.',
      ],
    },
    {
      title: 'Categories of Planning Poker Tools',
      content: 'Free scrum poker tools fall into a few broad categories. Knowing which category fits your team narrows the search quickly.',
      paragraphs: [
        'Browser-based standalone tools are the most common. They run on a website, need nothing installed, and usually let guests join with a link. They suit teams that want to start estimating immediately and do not need estimates written back into a ticketing system automatically. Their main trade-off is that estimates have to be copied into the backlog manually, which is why an export or copy feature matters.',
        'Backlog-tool plugins and integrations live inside Jira, Azure DevOps, or similar systems. Their strength is that the story and the estimate are in one place. Their trade-offs are that everyone usually needs a license and a login for the host system, that spectators from outside the organization are harder to include, and that free tiers for marketplace apps can be limited or time-bound. Check the specifics for your platform before committing.',
        'Physical card decks still work for fully co-located teams. They cost little, need no setup, and have no privacy questions. They do not work for hybrid teams, they leave no history, and the "reveal" relies on people not peeking.',
        'Self-hosted open-source tools are a good fit when data must stay inside the company network or when the team wants to customize the tool. The cost is operational: someone has to deploy, update, and keep it running.',
      ],
    },
    {
      title: 'How Scrum Poker Online Fits the Checklist',
      content: 'Scrum Poker Online (scrumpokerplay.com) is a free, browser-based planning poker tool. Against the criteria above, here is what it offers — stated plainly so you can compare it with whatever else you are evaluating.',
      items: [
        'Free with no sign-up: the facilitator creates a room, shares a code or QR invite, and participants join with a display name. There are no accounts at all and nothing to pay.',
        'Participants: up to 50 people in one room, including spectators.',
        'Decks: Scrum (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100), Fibonacci, T-Shirt sizes, Powers of 2, and custom decks.',
        'Reveal mechanics: votes stay hidden until someone in the room reveals the round (or only the host, if the host runs the rounds), after a 3-second countdown; the result view shows the spread with a consensus indicator and a suggested estimate.',
        'Session tools: built-in team chat, a story queue you can fill by pasting or importing a CSV file (a Jira or spreadsheet export works), a shared timer that counts up or down, spectator mode, emoji reactions, and a nudge to prompt a teammate who has not voted yet.',
        'Host tools: change the deck, reveal automatically once everyone has voted, anonymous voting, let only the host run the round, close the room to newcomers, remove people, hand over the host role, and keep a room so its link, setup and story queue work again next sprint.',
        'Tickets: issue keys such as PROJ-123 become links to your tracker once the host sets its address.',
        'History: round history with the final estimate for each story, downloadable as a CSV file with issue key and story point columns, or copied as Markdown into your sprint notes.',
        'Mobile and languages: works at phone width and is available in 7 languages.',
        'Privacy: no accounts or e-mail addresses; room content is deleted about an hour after the last person leaves, and a kept room keeps only its code, name, deck, settings, story queue and final estimates.',
      ],
      paragraphs: [
        'What it does not do: it does not write estimates back into a ticketing system automatically. If your team needs that integration, a plugin for your backlog tool may be a better fit, or you can combine the two — estimate in the browser, download the CSV and import it into your tracker. It is also built for live sessions only: rooms are real-time, so it does not suit voting spread over a day.',
      ],
    },
    {
      title: 'Questions to Ask Before Choosing',
      content: 'These questions surface the constraints that feature lists tend to hide. Answer them with your team before running a trial session.',
      items: [
        '1. Who joins our sessions? Count developers, the Product Owner, the Scrum Master, and any regular stakeholders. That is your minimum participant number.',
        '2. Which deck do we use, and is anyone likely to want a different one? Teams that estimate both stories and bugs often use two decks.',
        '3. Does everyone have to log in to something already? If the team lives in one backlog tool all day, a plugin may be natural; if contractors or partner teams join, a no-sign-up tool is easier.',
        '4. Where do the estimates need to end up? If the answer is "in the tickets", check how easy it is to get them there.',
        '5. What are our data and privacy rules? Ask whether room contents are stored, for how long, and whether the vendor can show you.',
        '6. Do we run any sessions asynchronously? If so, rooms need to persist long enough for people in other time zones to vote.',
        '7. What happens when the tool has a bad day? Check that you can fall back to something simple without losing the session.',
      ],
    },
    {
      title: 'A 15-Minute Evaluation Session',
      content: 'The fastest way to compare tools is to [run a short scrum poker session](/guide) the same way in each. Do not rely on the marketing page.',
      items: [
        'Create a room and time how long it takes for three people to join from a link, one of them on a phone.',
        'Load three stories, including one deliberately vague one, into the queue.',
        'Vote on the first story, reveal, and check that no votes were visible before the reveal.',
        'Start the timer on the second story and check that everyone sees the same time.',
        'Have one person use the "?" card on the vague story and see how the tool presents it.',
        'Add a spectator and confirm they cannot vote.',
        'Export or copy the results and paste them into your backlog tool.',
        'Close the browser, reopen the room link, and confirm the session state is where you left it.',
      ],
    },
    {
      title: 'Common Mistakes When Choosing a Free Tool',
      content: 'Teams tend to make the same few mistakes when picking an estimation tool. They are easy to avoid once named.',
      items: [
        'Choosing on feature count. A tool with thirty features that nobody understands loses to a tool with eight that everyone uses.',
        'Ignoring the join experience. If joining a room takes more than a minute, someone will fall back to typing numbers in chat.',
        'Not testing on a phone. At least one participant per session will be on mobile at some point.',
        'Forgetting the history. Without an export, every session ends with someone retyping estimates by hand, and mistakes creep in.',
        'Assuming the free tier is permanent. If a vendor\'s business model depends on converting you to a paid plan, plan for that conversation before it happens.',
        'Letting the tool dictate the process. The tool should support the way your team estimates — hidden votes, discussion, re-vote — not replace it with a different workflow.',
      ],
    },
    {
      title: 'Bottom Line',
      content: 'There is no single best free scrum poker tool for every team, but there is a best tool for yours: the one that meets the essential criteria, matches how you actually work, and that the whole team will open without being reminded. Use the checklist, run the 15-minute evaluation with two or three candidates, and decide together. If you want somewhere to start, Scrum Poker Online is free, needs no sign-up, and covers the essentials above — [start a free room](/) with your team and see whether it fits.',
    },
  ],
  faq: [
    {
      q: 'Is there a completely free planning poker tool with no sign-up?',
      a: 'Yes. Several browser-based tools let a facilitator create a room and share a link so participants join with only a display name. Scrum Poker Online is one example: it is free, has no accounts at all, and every feature is included.',
    },
    {
      q: 'What is the difference between scrum poker and planning poker tools?',
      a: 'None in practice. "Planning poker" is the original name of the estimation technique; "scrum poker" is what many Scrum teams call it. Tools that use either name do the same job: private voting on story size with a simultaneous reveal.',
    },
    {
      q: 'Do I need a Jira or Azure DevOps integration for planning poker?',
      a: 'Only if writing estimates back into tickets automatically is important to you and everyone in the session already has access to that system. Many teams estimate in a standalone browser tool and copy the results into their backlog afterwards, which takes a minute and keeps the session open to guests.',
    },
    {
      q: 'How many people can join a free scrum poker room?',
      a: 'It varies by tool, so check the free plan limits against your largest session. Scrum Poker Online allows up to 50 participants in one room at no cost, which covers most Scrum teams with room for spectators. A host can keep a room, so the same link and setup work again next sprint.',
    },
    {
      q: 'Can we use planning poker tools asynchronously across time zones?',
      a: 'Some tools support it, as long as rooms persist long enough for everyone to vote and nobody reveals early. Scrum Poker Online is built for live sessions instead: people who disconnect leave the room after about 90 seconds, and an empty room is deleted after about an hour. Across time zones, use a shared overlap window, even a short one, and prepare the stories in writing beforehand.',
    },
  ],
};

export default en;
