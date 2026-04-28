import { WorkLog } from "@/types/worklog";
import httpRequest from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";

export default function useGetActiveLog() {
  return useQuery({
    queryKey: ["getActiveLog"],
    queryFn: () =>
      httpRequest<WorkLog>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/work_log/active`,
      }),
  });
}
