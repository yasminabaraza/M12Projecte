type GameState = {
  timeRemainingSeconds?: number;
  lastTimerUpdate?: string | null;
  isTimerRunning?: boolean;
};

export function calculateRemainingTime(state: GameState) {
  const remaining = state.timeRemainingSeconds ?? 1800;

  if (!state.lastTimerUpdate || !state.isTimerRunning) {
    return remaining;
  }

  const elapsedSeconds = Math.floor(
    (Date.now() - new Date(state.lastTimerUpdate).getTime()) / 1000,
  );

  return Math.max(0, remaining - elapsedSeconds);
}
