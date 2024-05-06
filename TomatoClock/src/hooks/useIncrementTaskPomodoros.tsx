import axios from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export async function useIncrementTaskPomodoros() {
  const queryClient = useQueryClient();

  const incrementTaskPomodoros = useCallback(
    async (taskId: string) => {
      try {
        await axios.patch(`/task/increment/${taskId}`, {}, {});

        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      } catch (error) {
        console.error(error);
      }
    },
    [queryClient]
  );

  return incrementTaskPomodoros;
}
