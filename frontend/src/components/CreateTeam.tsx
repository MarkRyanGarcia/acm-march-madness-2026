import { useState } from "react";
import { useCreateTeam } from "@/client/team/createTeam";
import { validateJoinCode, validateTeamName } from "@/utils/validateForm";
import { useJoinTeam } from "@/client/team/joinTeam";

type Props = {
  userId: string;
};

export const CreateTeamForm: React.FC<Props> = ({ userId }) => {
  const [teamName, setTeamName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [teamNameError, setTeamNameError] = useState<string | null>(null);
  const [joinCodeError, setJoinCodeError] = useState<string | null>(null);
  const createTeam = useCreateTeam(userId);
  const joinTeam = useJoinTeam(userId);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
    setTeamNameError(validateTeamName(value));
  };

  const handleTeamNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateTeamName(teamName);
    if (validationError) {
      setTeamNameError(validationError);
      return;
    }

    setTeamNameError(null);
    createTeam.mutate({ team_name: teamName, accepting_members: true });
  };

  const handleJoinCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateJoinCode(joinCode);
    if (validationError) {
      setJoinCodeError(validationError);
      return;
    }

    setJoinCodeError(null);
    joinTeam.mutate({ invite_code: joinCode });
  };

  const isInvalid = validateTeamName(teamName) != null;

  return (
    <div className="mt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl text-white bg-sky-500 p-8 shadow-lg">
        <form onSubmit={handleTeamNameSubmit}>
          <h2 className="text-2xl font-semibold text-center">
            Let's Make You a Team!
          </h2>

          <p className="mt-2 text-sm text-center">
            Choose your team name. It will be displayed in the leaderboard.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700">
              Team name
            </label>
            <input
              value={teamName}
              onChange={handleTeamNameChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2
                       text-slate-800 placeholder-slate-700 outline-none"
              placeholder="acmRocks"
            />
            {teamNameError && (
              <p className="mt-1 text-sm text-pink-600">{teamNameError}</p>
            )}
          </div>

          {createTeam.isError && (
            <p className="mt-3 text-sm text-pink-600">
              {createTeam.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isInvalid || createTeam.isPending}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5
                     text-white font-medium hover:bg-blue-700
                     disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {createTeam.isPending ? "Joining…" : "Join the Madness!"}
          </button>
        </form>
        <form onSubmit={handleJoinCodeSubmit}>
          <div className="mt-8 flex items-center gap-4">
            <hr className="flex-1 border border-white" />
            <span className="text-sm text-white/80">or</span>
            <hr className="flex-1 border border-white" />
          </div>

          <p className="text-sm text-center">
            Already have a join code? Enter it below.
          </p>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700">
              Join code
            </label>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2
                     text-slate-800 placeholder-slate-700 outline-none"
              placeholder="ACMM2026"
            />
            {joinCodeError && (
              <p className="mt-1 text-sm text-pink-600">{joinCodeError}</p>
            )}
          </div>

          {joinTeam.isError && (
            <p className="mt-3 text-sm text-pink-600">
              {joinTeam.error.message}
            </p>
          )}

          <button
            type="submit"
            name="intent"
            value="join"
            disabled={joinCode.length === 0}
            className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2.5
                   font-medium hover:bg-emerald-700
                   disabled:cursor-not-allowed disabled:opacity-70"
          >
            Join Team
          </button>
        </form>
      </div>
    </div>
  );
};
