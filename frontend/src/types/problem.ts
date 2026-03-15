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
  is_signed_in: boolean;
  can_submit: boolean;
  part1: string;
  part2: string;
  part1_answer: number | null;
  part2_answer: number | null;
};

export type Problem = {
  signedIn: boolean;
  canSubmit: boolean;
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
  part_to_submit: number;
  cooldown_until: string;
  remaining_cooldown_seconds: number;
};

export type ProblemSubmission = {
  correct: boolean;
  error: boolean;
  part: number;
  cooldownUntil: string;
  remainingCooldownSeconds: number;
};
