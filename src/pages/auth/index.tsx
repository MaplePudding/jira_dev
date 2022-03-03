import { useAuth } from "../../context/auth";

export const AuthPage = () => {
  const auth = useAuth();
  return <div className={"auth"}>AuthPage</div>;
};
