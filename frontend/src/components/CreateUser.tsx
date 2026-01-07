import { useState } from "react";
import type React from "react";
import { useCreateUser } from "@/client/createUser";

type Props = {
  userId: string;
  defaultUsername: string;
  email: string | null;
};

function validateGithubUsername(username: string): string | null {
  if (username.length === 0) return "Username is required";
  if (username.length < 3 || username.length > 39)
    return "Username must be between 3 - 39 characters";
  if (!/^[a-zA-Z0-9-]+$/.test(username))
    return "Only letters, numbers, and hyphens are allowed";
  if (username.startsWith("-") || username.endsWith("-"))
    return "Username cannot start or end with a hyphen";
  if (username.includes("--"))
    return "Username cannot contain consecutive hyphens";
  return null;
}

export const CreateUserForm: React.FC<Props> = ({
  userId,
  defaultUsername,
  email,
}) => {
  const [userName, setUserName] = useState(defaultUsername);
  const [error, setError] = useState<string | null>(null);
  const createUser = useCreateUser(userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    setError(validateGithubUsername(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateGithubUsername(userName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    createUser.mutate({
      id: userId,
      username: userName,
      email,
    });
  };

  const isInvalid = validateGithubUsername(userName) != null;

  return (
    <div className="mt-16 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl text-white bg-sky-500 p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center">Welcome 🌸</h2>

        <p className="mt-2 text-sm text-center">
          We picked your GitHub username for you. You can keep it or make it
          your own.
        </p>

        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            value={userName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2
                       text-slate-800 placeholder-slate-400 outline-none"
          />
          {error && <p className="mt-1 text-sm text-pink-600">{error}</p>}
        </div>

        {createUser.isError && (
          <p className="mt-3 text-sm text-pink-600">
            {createUser.error.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isInvalid || createUser.isPending}
          className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5
                     text-white font-medium hover:bg-blue-700
                     disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {createUser.isPending ? "Joining…" : "Join the Madness!"}
        </button>
      </form>
    </div>
  );
};
