import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitAnswer } from "@/services/game/gameService";
import type { SolveEnigmaResponse } from "@/types/game";

const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SolveEnigmaResponse,
    Error,
    { gameId: number; answer: string }
  >({
    mutationFn: ({ gameId, answer }) => submitAnswer(gameId, answer),
    onSuccess: (data) => {
      if (data.correct) {
        queryClient.invalidateQueries({ queryKey: ["activeGame"] });
      }
    },
  });
};

export default useSubmitAnswer;
