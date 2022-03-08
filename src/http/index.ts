import { http } from "./fetch";
import {
  cleanEmptyString,
  cleanObject,
  getDataFromLocalStorage,
} from "../utils";
import { AuthContextType } from "../types/auth";
import { UserType } from "../types/user";
import { ProjectType } from "../types/project";

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

export const apiProjects = (personId: string | null, name: string | null) => {
  return http<ProjectType[]>(
    "/projects",
    "GET",
    cleanEmptyString({ personId: personId, name: name }),
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiCreateProject = (
  name: string,
  organization: string,
  personId: string
) => {
  return http<ProjectType>(
    "/projects",
    "POST",
    { name, organization, personId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiDeleteProject = (key: string) => {
  return http(
    `/projects/${key}`,
    "DELETE",
    {},
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiEditProject = (project: ProjectType) => {
  return http<ProjectType>(
    `/projects/${project.id}`,
    "PATCH",
    {
      ...project,
    },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiUsers = () => {
  return http<UserType[]>(
    "/users",
    "GET",
    {},
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiProject = () => {};
