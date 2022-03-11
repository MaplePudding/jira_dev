import { useQuery } from "react-query";
import { apiTasks, apiTaskTypes } from "../../http";

export const useTaskItems = (projectId: string) => {
  return useQuery("tasks", () => apiTasks(projectId));
};
