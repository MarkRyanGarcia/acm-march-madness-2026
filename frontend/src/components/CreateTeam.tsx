import { useState } from "react";
import { StrokedText } from "./StrokedText";
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
    <div className="relative overflow-hidden min-h-screen">
      <div className="py-16 max-w-4xl mx-auto grid items-center gap-8 px-8 md:px-4">
        <div className="grid items-center gap-4 md:gap-8">
          <StrokedText
            text="Team Creation"
            className="text-3xl md:text-5xl lg:text-7xl text-center font-extrabold"
          />
          <p className="text-xl md:text-3xl font-bold text-center">
            Create or join a team!
          </p>
        </div>
        <div className="z-20 w-full max-w-5xl mx-auto rounded-2xl bg-background-200 border-6 md:border-12 border-background-300 p-8 flex flex-col gap-6">
          <p className="mt-2 md:text-lg font-medium text-center">
            If you are creating a team, you will be the team leader. You will be
            able to invite others to your team using the team code. - To create
            a team, put in your wanted team name. - To join a team, put in the
            team code.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-8">
            <form
              onSubmit={handleTeamNameSubmit}
              className="flex-1 h-full flex flex-col"
            >
              <div className="text-lg md:text-xl">
                <label className="block font-medium">Team name</label>
                <input
                  value={teamName}
                  onChange={handleTeamNameChange}
                  className="mt-1 w-full bg-background-300 rounded-xl border-4 border-white px-3 py-2 outline-none"
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

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={isInvalid || createTeam.isPending}
                  className="mt-6 w-full rounded-xl bg-grass-400 border-4 border-white px-4 py-2.5 text-white font-medium disabled:opacity-70"
                >
                  {createTeam.isPending ? "Creating…" : "Create Team"}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center self-stretch">
              <div className="sm:hidden flex items-center w-full gap-4">
                <div className="h-px flex-1 bg-grass-400 rounded-full" />
                <span className="bg-background-300 px-3 font-semibold">OR</span>
                <div className="h-px flex-1 bg-grass-400 rounded-full" />
              </div>

              <div className="hidden sm:flex relative items-center justify-center h-full">
                <div className="absolute h-full w-1 rounded-full bg-grass-400" />
                <span className="z-10 bg-background-300 px-3 font-semibold">
                  OR
                </span>
              </div>
            </div>

            <form
              onSubmit={handleJoinCodeSubmit}
              className="flex-1 h-full flex flex-col"
            >
              <div className="text-lg md:text-xl">
                <label className="block font-medium">Join code</label>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="mt-1 w-full bg-background-300 rounded-xl border-4 border-white px-3 py-2 outline-none"
                  placeholder="ACMM2026"
                />
                {joinCodeError && (
                  <p className="mt-3 text-sm text-pink-600">{joinCodeError}</p>
                )}
              </div>

              {joinTeam.isError && (
                <p className="mt-3 text-pink-600">{joinTeam.error.message}</p>
              )}

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={joinCode.length === 0 || joinTeam.isPending}
                  className="mt-6 w-full rounded-xl bg-grass-400 border-4 border-white text-white px-4 py-2.5 font-medium disabled:opacity-70"
                >
                  {joinTeam.isPending ? "Joining…" : "Join Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <img
        src="/hills_bg.svg"
        className="absolute bottom-0 w-full scale-y-50 origin-bottom"
      />
      <img
        src="/blue_capy.svg"
        className="z-20 w-32 absolute bottom-0 left-0 md:left-32"
      />
      <img
        src="/pink_capy.svg"
        className="z-20 w-32 absolute bottom-0 left-1/5 md:left-70"
      />
      <img
        src="/capybara2.svg"
        className="z-20 w-32 absolute bottom-0 right-0 md:right-1/5"
      />
    </div>
  );
};
