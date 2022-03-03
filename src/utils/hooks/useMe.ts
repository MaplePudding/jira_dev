import { useQuery } from "react-query";
import { apiMe } from "../../http";
import { AuthContextType } from "../../types/auth";

export const useMe = () => {
  //@ts-ignore
  return useQuery<AuthContextType>("me", apiMe);
};
