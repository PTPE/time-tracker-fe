import httpRequest from "@/utils/httpRequest";
import { StartTimerParams } from "@/types/worklog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useStartTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (startTimeData: StartTimerParams) =>
      httpRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/work_log/start`,
        method: "POST",
        config: {
          data: startTimeData,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getActiveLog"] });
    },
  });
}
