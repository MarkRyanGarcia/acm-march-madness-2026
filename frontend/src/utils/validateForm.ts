/**
 * Validates the user's username input based on the GitHub username rules.
 */
export function validateUsername(username: string): string | null {
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

/**
 * Validates a `teamName`.
 */
export function validateTeamName(teamName: string): string | null {
  if (teamName.length === 0) return "Team name is required";
  if (teamName.length < 3 || teamName.length > 20)
    return "Team name must be between 3 - 20 characters";
  if (!/^[a-zA-Z-0-9]+$/.test(teamName))
    return "Only letters and numbers are allowed"
  return null
}
