from app.db.models import Team
from app.schemas.team import TeamOut, TeamMemberOut


def team_to_out(team: Team) -> TeamOut:
    return TeamOut(
        id=team.id,
        team_name=team.team_name,
        invite_code=team.invite_code,
        accepting_members=team.accepting_members,
        members=[
            TeamMemberOut(
                user_id=m.user_id,
                username=m.user.username,
                is_leader=m.is_leader,
                joined_at=m.joined_at,
            )
            for m in team.members
        ],
    )
