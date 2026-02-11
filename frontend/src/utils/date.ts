export function formatSecondsAsText(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mPart = minutes > 0 ? `${minutes}m` : "";
  const sPart = `${seconds.toString().padStart(2, "0")}s`;
  return (mPart + sPart).trim();
}
