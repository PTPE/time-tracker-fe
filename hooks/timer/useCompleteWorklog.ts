import httpRequest from "@/utils/httpRequest";
import { StopTimerParams } from "@/types/worklog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCompleteWorklog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: StopTimerParams) =>
      httpRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/work_log/completed`,
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
