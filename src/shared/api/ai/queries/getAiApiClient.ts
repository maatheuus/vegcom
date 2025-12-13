import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../ai";

export const useGenerateResponse = () => {
  return useMutation({
    mutationFn: aiApi.generateResponse,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.error("Erro ao criar chat:", error);
    },
  });
};
