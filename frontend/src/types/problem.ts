export type ProblemListItemResponse = {
  day: number;
  released: boolean;
  release_time: string;
};

export type Problems = {
  problemList: Array<Omit<ProblemListItemResponse, "release_time">>;
  nextRelease: Date;
};

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
  correct: boolean | null;
  error: boolean;
  cooldown_until: string;
  remaining_cooldown_seconds: number;
};

export type ProblemSubmission = {
  correct: boolean;
  error: boolean;
  cooldownUntil: string;
  remainingCooldownSeconds: number;
};
