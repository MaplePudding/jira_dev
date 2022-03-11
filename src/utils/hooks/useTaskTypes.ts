import { useQuery } from "react-query";
import { apiTaskTypes } from "../../http";

export const useTaskType = () => {
  return useQuery("taskTypes", () => apiTaskTypes());
};
