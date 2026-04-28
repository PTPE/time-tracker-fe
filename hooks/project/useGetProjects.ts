import { ResGetProjects } from "@/types/project";
import httpRequest from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";

export default function useGetProjects() {
  return useQuery({
    queryKey: ["getProjects"],
    queryFn: async () =>
      httpRequest<ResGetProjects>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/project/all`,
      }),
  });
}
