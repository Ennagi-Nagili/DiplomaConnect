export type Task = {
  id: number;
  head: string;
  steps: Array<string>;
  stepDetails: Array<string>;
  deadlines: Array<string>;
  deadline: string;
  finished: boolean;
  date: string;
  answer: string;
  files: string[];
  review: string;
};
