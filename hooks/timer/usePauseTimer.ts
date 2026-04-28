import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PauseTimerParams } from "@/types/worklog";
import httpRequest from "@/utils/httpRequest";

export default function usePauseTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PauseTimerParams) =>
      httpRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/work_log/pause`,
        method: "PUT",
        config: {
          data: params,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getActiveLog"] });
    },
  });
}
