import { useState } from "react";
import type React from "react";
import { useCreateUser } from "@/client/createUser";

type Props = {
  clerkUserId: string;
  defaultUsername: string;
  email: string | null;
};

export const CreateUserForm: React.FC<Props> = ({
  clerkUserId,
  defaultUsername,
  email,
}) => {
  const [username, setUsername] = useState(defaultUsername);
  const createUser = useCreateUser(clerkUserId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createUser.mutate({
      clerk_user_id: clerkUserId,
      username,
      email,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Create your account</h2>

      <p>This is your GitHub username. You can keep it or change it.</p>

      <label>
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </label>

      {createUser.isError && (
        <p style={{ color: "red" }}>{createUser.error.message}</p>
      )}

      <button type="submit" disabled={createUser.isPending}>
        {createUser.isPending ? "Creating…" : "Create account"}
      </button>
    </form>
  );
};
