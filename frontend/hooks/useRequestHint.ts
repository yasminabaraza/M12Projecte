import { useMutation } from "@tanstack/react-query";
import { requestHint } from "@/services/game/gameService";
import type { UseHintResponse } from "@/types/game";

const useRequestHint = () =>
  useMutation<UseHintResponse, Error, { gameId: number }>({
    mutationFn: ({ gameId }) => requestHint(gameId),
  });

export default useRequestHint;
