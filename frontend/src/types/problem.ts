export type ProblemResponse = {
  part1: string;
  part2: string;
  part1_answer: number | null;
  part2_answer: number | null;
};

export type Problem = {
  part1: string;
  part2: string;
  part1Answer: number | null;
  part2Answer: number | null;
};

export type ProblemSubmissionInput = {
  part: number;
  answer: string;
};

export type ProblemSubmissionResponse = {
  correct?: boolean;
  error?: string;
  cooldown_until: string;
  remaining_cooldown: number;
};

export type ProblemSubmission = {
  correct: boolean;
  error: string | null;
};
