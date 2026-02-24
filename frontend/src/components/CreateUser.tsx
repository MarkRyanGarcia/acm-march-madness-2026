import { useState } from "react";
import { StrokedText } from "./StrokedText";
import type React from "react";
import { useCreateUser } from "@/client/user/createUser";
import { validateUsername } from "@/utils/validateForm";

type Props = {
  userId: string;
  defaultUsername: string;
  email: string | null;
};

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
    setError(validateUsername(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateUsername(userName);
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

  const isInvalid = validateUsername(userName) != null;

  return (
    <div>
      <div className="my-16 max-w-xl mx-auto grid gap-8 md:gap-16 items-center px-8 md:px-4">
        <StrokedText
          text="WELCOME :D"
          className="text-3xl md:text-5xl lg:text-7xl text-center font-extrabold"
        />

        <form
          onSubmit={handleSubmit}
          className="z-10 w-full rounded-2xl bg-background-200 outline-[#FFE9B8]/90 outline-4 md:outline-15 p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-semibold">Register</h2>
          <p className="mt-2 text-lg md:text-center">
            You can keep your GitHub username or make another one!
          </p>

          <div className="mt-6 text-lg md:text-xl">
            <label className="block font-medium">Username</label>
            <input
              value={userName}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl font-bold border-white border-4 px-3 py-2 placeholder-slate-400 outline-none"
            />
            {error && <p className="mt-1 text-[1rem] text-pink-600">{error}</p>}
          </div>

          {createUser.isError && (
            <p className="mt-3 text-lg text-pink-600">
              {createUser.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isInvalid || createUser.isPending}
            className="mt-6 w-full rounded-xl bg-grass-400 px-4 py-3 text-white font-medium transition not-disabled:hover:bg-gold-100 disabled:opacity-70 disabled:cursor-default"
          >
            {createUser.isPending ? "Joining…" : "Join the Madness!"}
          </button>
        </form>
      </div>
      <img
        src="/hills_bg.svg"
        className="absolute -bottom-1/3 w-full scale-y-40"
      />
    </div>
  );
};
