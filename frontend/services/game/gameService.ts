import { authRequest } from "@/services/apiClient";
import { ENDPOINTS } from "@/services/endpoints";
import type {
  GameResponse,
  StartGameResponse,
  SolveEnigmaResponse,
  UpdateGameStateResponse,
  GameState,
} from "@/types/game";

export function startGame(): Promise<StartGameResponse> {
  return authRequest<StartGameResponse>(ENDPOINTS.game.start, "POST");
}

export function getActiveGame(): Promise<GameResponse> {
  return authRequest<GameResponse>(ENDPOINTS.game.activeGame);
}

export function getLastGame(): Promise<GameResponse> {
  return authRequest<GameResponse>(ENDPOINTS.game.lastGame);
}

export function saveGame(
  gameId: number,
  state: GameState,
): Promise<UpdateGameStateResponse> {
  return authRequest<UpdateGameStateResponse>(ENDPOINTS.game.save, "POST", {
    gameId,
    state,
  });
}

export function submitAnswer(
  gameId: number,
  answer: string,
): Promise<SolveEnigmaResponse> {
  return authRequest<SolveEnigmaResponse>(
    ENDPOINTS.game.answer(gameId),
    "POST",
    { answer },
  );
}
