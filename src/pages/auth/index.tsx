import { useAuth } from "../../context/auth";
import { Route, Routes, useNavigate } from "react-router";
import { Projects } from "./projects";
import { useMount } from "../../utils/hooks/useMount";
import { Task } from "./task";

export const AuthPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useMount(() => {
    navigate("/projects");
  });
  return (
    <Routes>
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id/*" element={<Task />} />
    </Routes>
  );
};
