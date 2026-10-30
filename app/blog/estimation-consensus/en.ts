import type { Localized } from '../articleTypes';

const en: Localized = {
  title: "How to Reach Estimation Consensus in Planning Poker",
  subtitle: "Why story point estimates diverge, how to run a consensus round step by step, and when disagreement is telling you something more useful than a number.",
  sections: [
    {
      title: "What does consensus mean in Planning Poker?",
      content: "In [Planning Poker](/blog/what-is-planning-poker), consensus means the team agrees on a single story point value for a backlog item and, more importantly, agrees on what the item involves. The number is a by-product. The reason teams estimate together is to surface different assumptions about scope, risk and approach before the work starts, and the discussion that closes the gap between a 3 and a 13 is where that happens.",
      paragraphs: [
        "Consensus is not unanimity by exhaustion, and it is not the average of the votes. A team that lands on 8 because two people said 5, two said 13 and the facilitator split the difference has not reached consensus; it has hidden a disagreement inside a number. Real consensus means every estimator can say “I can live with this value and I understand why it is that value.”",
      ],
    },
    {
      title: "Why estimates diverge in the first place",
      content: "When one developer votes 3 and another votes 13 for the same item, it is rarely because one of them is bad at estimating. Divergent votes almost always come from one of a small number of causes.",
      items: [
        "Different scope in mind: one person is estimating the happy path, the other is including error handling, migrations and documentation.",
        "Different knowledge: one estimator knows the code and remembers a similar change taking an afternoon; another has never touched that module.",
        "Hidden dependencies: someone knows the item needs an external team, a third-party API or a legacy system with no tests.",
        "Different definitions of done: one person counts “merged”, another counts “deployed, monitored and communicated”.",
        "Ambiguity in the item itself: the description leaves room for two or three legitimate interpretations.",
      ],
      paragraphs: [
        "Every one of these is worth discovering during estimation rather than during the sprint. That is why a spread of votes is a good outcome of a round, not a failure.",
      ],
    },
    {
      title: "How to run a consensus round step by step",
      content: "A consensus round follows the same fixed rhythm as any [well-run scrum poker session](/guide). Keeping the rhythm is what lets a team estimate a dozen items in half an hour without cutting the discussion that matters.",
      items: [
        "1. The Product Owner or the item's author reads the item and its acceptance criteria aloud.",
        "2. The team asks clarifying questions for a couple of minutes. The facilitator writes down any answer that changes the scope.",
        "3. Every estimator privately picks a card. Nobody speaks a number.",
        "4. All cards are revealed at the same moment.",
        "5. If the votes agree or sit on adjacent cards, the team takes the agreed value — usually the higher of two adjacent values — and moves on.",
        "6. If the spread is wider, the highest and lowest voters each explain their reasoning in a minute or less. Others may add facts, not opinions about the number.",
        "7. The team votes again. Most gaps close on the second round.",
        "8. If a third round still shows a wide spread, stop estimating: the item is either not understood or too large. Split it, clarify it, or send it back to refinement.",
      ],
    },
    {
      title: "Worked example: closing a 3-versus-13 gap",
      content: "Suppose a team of five is estimating the item “allow users to export their order history as CSV”. The first reveal shows 3, 5, 5, 8 and 13. This example is invented for illustration.",
      paragraphs: [
        "The facilitator asks the 3 and the 13 to speak. The developer who voted 3 says the API already returns order history as JSON; converting it to CSV and adding a download button is a few hours of work. The developer who voted 13 points out that some customers have tens of thousands of orders, so the export would have to be generated asynchronously and delivered by e-mail, and that the current endpoint already times out above a few hundred rows.",
        "Now the team knows two things it did not know a minute earlier: the item hides a performance problem, and the Product Owner has to decide whether large accounts are in scope. The Product Owner says the first version can be limited to the last twelve months and a few thousand rows at most, with large exports deferred to a separate item.",
        "The second vote shows 5, 5, 5, 8 and 8. The two 8 voters say their remaining doubt was about large exports, which are now out of scope, so the usual lean toward the higher card does not apply: the team agrees on 5 for the limited scope and creates a new backlog item for asynchronous large exports, which will be estimated separately. The round took about six minutes and removed a risk that would otherwise have surfaced in the second week of the sprint.",
      ],
    },
    {
      title: "Techniques that speed up convergence",
      content: "The following techniques shorten discussion without forcing artificial agreement.",
      items: [
        "Ask the extremes first. Hearing the lowest and highest voters before anyone else prevents the majority from drowning out the one person who knows something important.",
        "Keep reference stories. Two or three previously delivered items with agreed sizes give everyone a shared ruler: “is this bigger or smaller than the password-reset story we called a 5?”",
        "Time-box the discussion. Three minutes of discussion, then a re-vote, regardless of where things stand. If a third vote is needed, the item goes back to refinement.",
        "Split before you argue. When the gap comes from two different interpretations, splitting the item into both interpretations usually resolves the disagreement instantly.",
        "Lean toward the higher adjacent value. When two neighboring cards remain, the higher one usually captures the uncertainty better than the lower.",
      ],
    },
    {
      title: "Anchoring and other biases that block honest estimates",
      content: "Anchoring is the tendency to adjust toward the first number you hear. If a senior developer says “this feels like a 3” before the cards are shown, the rest of the team drifts toward 3 whether or not they agree. This is the single most important reason Planning Poker hides votes until everyone has chosen: the format is not a game, it is a countermeasure.",
      paragraphs: [
        "Related biases show up in the same meetings. Authority bias makes people defer to the most senior voice. Optimism bias leads estimators to assume the happy path. Group pressure makes the one person holding a 13 in a room full of 3s quietly lower their card on the re-vote. Each of these is reduced by the same practice: private choice, simultaneous reveal, and a norm that the outliers speak first and are thanked for it.",
        "Tooling matters here because the format is easy to break. In a video call, saying numbers aloud or typing them into chat one after another reintroduces the anchor. Scrum Poker Online is a free option that keeps votes hidden until the simultaneous reveal, requires no sign-up, and keeps a round history of each item's votes and final estimate, so the team can review the results afterwards.",
      ],
    },
    {
      title: "When to stop discussing: rules of thumb by gap size",
      content: "Not every disagreement deserves the same amount of time. A simple rule tied to the distance between cards on the [Fibonacci planning poker scale](/fibonacci-planning-poker) keeps rounds short.",
      items: [
        "Same card or adjacent cards (5 and 8): take the higher value or the majority and move on; the discussion would cost more than the difference.",
        "Two cards apart (3 and 8): one round of highest-and-lowest explanation, then re-vote.",
        "Three or more cards apart (2 and 13): the item is understood differently by different people. Clarify the scope before voting again, and be ready to split.",
        "A question-mark card: someone cannot estimate at all. Do not proceed until the item has been explained to them; if it cannot be explained quickly, it is not ready.",
        "A coffee or break card: the team is tired. Estimation quality drops sharply with fatigue; take the break.",
      ],
    },
    {
      title: "Common consensus mistakes and anti-patterns",
      content: "Teams that struggle with estimation usually recognize themselves in one or more of these patterns.",
      items: [
        "Averaging the votes. The mean of 3 and 13 is a number nobody believes and a discussion nobody had.",
        "Majority vote. Overruling the one person who knows about the dependency defeats the purpose of estimating as a group.",
        "Letting the lead decide. If the outcome is always the lead's number, everyone else stops thinking and the estimate becomes a one-person guess with a ceremony around it.",
        "Discussing until everyone agrees. Endless debate produces fatigue, not accuracy. Time-box and re-vote.",
        "Rewarding low estimates. If small numbers are praised, small numbers are what you will get, and the sprint will pay for it.",
        "Re-opening the number later. Once the team agrees, the estimate stands unless the scope changes. Adjusting it after the work is done to “fix” velocity breaks the history.",
      ],
    },
    {
      title: "When consensus is a red flag, and when disagreement is fine",
      content: "Rapid unanimous consensus on every item can be a warning sign. If five people vote the same card every time without a word of discussion, they may be anchoring on a lead voice, rubber-stamping to finish sooner, or not really reading the items. Healthy teams disagree some of the time; it shows that people are thinking independently and bringing different knowledge to the table.",
      paragraphs: [
        "Equally, not every disagreement needs resolving. On small items an adjacent-card gap is noise. On large, uncertain items the honest outcome is sometimes “we do not know enough yet”, and the correct action is a spike or a split rather than a number, or at most a [coarse T-shirt size](/t-shirt-sizing). Forcing consensus in those cases gives you a precise-looking estimate with nothing behind it.",
      ],
    },
    {
      title: "The facilitator's role in reaching consensus",
      content: "Someone must own the rhythm of the round, and that person usually should not vote. The facilitator — often the Scrum Master — reads or asks for the item, keeps the clarifying questions on scope rather than solution, calls the reveal, invites the extremes to speak, watches the clock, and calls the re-vote. In a co-located room this is easy; in a remote session it is the difference between a twenty-minute estimation and an hour.",
      paragraphs: [
        "The facilitator also protects quieter voices and keeps the Product Owner in an answering role: the Product Owner sets priority, not size.",
      ],
    },
    {
      title: "Estimation consensus checklist",
      content: "Run through this list before and during your next estimation session.",
      items: [
        "Every item has a description and acceptance criteria before it is estimated.",
        "Two or three reference stories with agreed sizes are visible to the whole team.",
        "Votes are private and revealed simultaneously; nobody says a number before the reveal.",
        "The highest and lowest voters explain first, and others add facts rather than opinions.",
        "Discussion per item is time-boxed; a wide spread after two re-votes sends the item back to refinement.",
        "Adjacent-card disagreements are settled by taking the higher value or the majority, never by averaging.",
        "The Product Owner answers scope questions but does not vote.",
        "Final values and one-line reasons for re-votes are recorded.",
        "Unanimous votes with no discussion are occasionally questioned by the facilitator.",
      ],
    },
  ],
  faq: [
    {
      q: "What happens if the team cannot agree on an estimate?",
      a: "After two re-votes with a wide spread, stop voting. The item is either understood differently by different people or too uncertain to size. Split it into the interpretations on the table, clarify the scope with the Product Owner, or schedule a short spike to learn what is missing. Forcing a number at that point produces an estimate nobody believes.",
    },
    {
      q: "Should you take the average of Planning Poker votes?",
      a: "No. Averaging hides the disagreement that the round was meant to surface, and it usually produces a value that is not even on the scale. If the votes are on adjacent cards, take the higher one or the majority. If they are far apart, discuss and re-vote.",
    },
    {
      q: "Should the Product Owner or Scrum Master vote?",
      a: "The Product Owner should not vote: their role is to explain scope and priority, and their estimate would carry authority it should not have. The Scrum Master usually facilitates rather than votes, unless they also do development work on the team, in which case they vote as a developer and someone else watches the clock.",
    },
    {
      q: "How many rounds of voting are normal for one item?",
      a: "One or two. Most items either agree on the first reveal or converge after a single explanation from the highest and lowest voters. A third round is a signal that the item needs clarification or splitting rather than more debate.",
    },
    {
      q: "Does consensus mean everyone must vote the same card?",
      a: "No. Consensus means every estimator can accept the final value and understands the reasoning behind it. Votes on adjacent cards, resolved by taking the higher value, are a normal consensus outcome. Everyone playing the same card on every item, with no discussion, is more often a sign of anchoring than of a well-calibrated team.",
    },
  ],
};

export default en;
