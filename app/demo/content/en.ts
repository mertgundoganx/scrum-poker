import type { DemoContent } from './types';

const en: DemoContent = {
  title: 'Reading the result',
  paragraphs: [
    'In this round four people estimated the same story: Aleyna and Carol played 5, Bob played 8 and Damla played 3. The average is 5.3, but the average is only a hint: planning poker estimates are cards on a scale, so the team records a value from the deck, not 5.3.',
    'The spread matters more. The votes run from 3 to 8, two steps apart on the [Fibonacci scale](/fibonacci-planning-poker), and the distribution shows most of the team on 5. That is close to agreement, with two outliers worth hearing: Bob may have spotted extra work, such as a data migration or missing tests, and Damla may know a shortcut, such as an existing component the story can reuse.',
    'What happens next: Bob and Damla explain their reasoning in a minute or two, the team clarifies the story, and everyone votes again. Most stories converge on the second round; if the votes still split, the story usually needs to be broken down. Once the team agrees, it records the final estimate (here most likely 5) and starts a new round for the next story. Tips for that conversation are in [how to reach estimation consensus](/blog/estimation-consensus).',
    'Ready to try it with your own backlog? [Start a free room](/), share the link with your team and run your first round in under a minute: no sign-up, no install.',
  ],
};

export default en;
