import { useQuery } from "react-query";
import { apiProjects } from "../../http";

export const useProjects = (personId: string | null, name: string | null) => {
  return useQuery([personId, name], () => apiProjects(personId, name));
};
