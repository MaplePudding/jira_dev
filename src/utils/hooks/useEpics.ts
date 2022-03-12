import { useQuery } from "react-query";
import { apiEpics } from "../../http";

export const useEpics = (projectId: string) => {
  return useQuery("epics", () => apiEpics(projectId));
};
