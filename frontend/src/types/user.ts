export type UserInput = {
  clerk_user_id: string;
  username: string;
  email: string | null;
};

export type UserResponse = null | {
  id: number;
  clerk_user_id: string;
  username: string;
  email: string | null;
  createdAt: string;
};

export type User = {
  id: number;
  userName: string;
  email: string | null;
};
