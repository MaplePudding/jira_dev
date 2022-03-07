import { useNavigate } from "react-router";
import { deleteLocalStorage } from "../index";
import { useMe } from "./useMe";

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    deleteLocalStorage("__auth_provider_token__");
    navigate("/");
  };
};
