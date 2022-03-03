import { http } from "./fetch";
import { getDataFromLocalStorage } from "../utils";
import { AuthContextType } from "../types/auth";

export const apiMe = () => {
  const token = getDataFromLocalStorage("__auth_provider_token__");
  return http<AuthContextType>("/me", "GET", {}, { token: token });
};

export const apiLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return http("/login", "POST", { username, password }, { token: "token" });
};

export const apiRegister = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return http("/register", "POST", { username, password }, { token: "token" });
};
