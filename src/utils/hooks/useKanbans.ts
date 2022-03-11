import { useQuery } from "react-query";
import { apiKanbans, apiProjects } from "../../http";

export const useKanbans = (projectId: string) => {
  return useQuery("kanbans", () => apiKanbans(projectId));
};
