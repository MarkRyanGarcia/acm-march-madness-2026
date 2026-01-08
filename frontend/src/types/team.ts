export type TeamInput = {
  team_name: string;
  accepting_members: boolean;
};

export type TeamMemberResponse = {
  user_id: string;
  username: string;
  is_leader: boolean;
  joined_at: string;
};

export type TeamResponse = {
  id: number;
  team_name: string;
  invite_code: string;
  accepting_members: boolean;
  members: Array<TeamMemberResponse>;
} | null;

export type TeamMember = {
  id: string;
  userName: string;
  isLeader: boolean;
  joinedAt: string;
};

export type Team = {
  id: number;
  teamName: string;
  inviteCode: string;
  acceptingMembers: boolean;
  members: Array<TeamMember>;
};
