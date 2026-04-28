import httpRequest from "@/utils/httpRequest";
import { ResumeTimerParams } from "@/types/worklog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useResumeTimer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ResumeTimerParams) =>
      httpRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/work_log/resume`,
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
