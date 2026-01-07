export type UserInput = {
  id: string;
  username: string;
  email: string | null;
};

export type UserResponse = null | {
  id: string;
  username: string;
  email: string | null;
  createdAt: string;
};

export type User = {
  id: string;
  userName: string;
  email: string | null;
};
