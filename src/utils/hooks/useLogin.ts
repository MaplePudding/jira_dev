import { useMutation, useQuery } from "react-query";
import { apiLogin } from "../../http";
import { useAuth } from "../../context/auth";

export const useLogin = () => {
  return useMutation(
    ({ username, password }: { username: string; password: string }) => {
      return apiLogin({ username, password });
    }
  );
};
