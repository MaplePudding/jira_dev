import { useMutation } from "react-query";
import { apiLogin, apiRegister } from "../../http";

export const useRegister = () => {
  return useMutation(
    ({ username, password }: { username: string; password: string }) => {
      return apiRegister({ username, password });
    }
  );
};
