import { useQuery } from "react-query";
import { apiProjects, apiUsers } from "../../http";
import { UserType } from "../../types/user";

export const useUsers = () => {
  return useQuery("users", () => apiUsers());
};
