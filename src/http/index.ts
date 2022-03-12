import { http } from "./fetch";
import {
  cleanEmptyString,
  cleanObject,
  getDataFromLocalStorage,
} from "../utils";
import { AuthContextType } from "../types/auth";
import { UserType } from "../types/user";
import { ProjectType } from "../types/project";
import { TaskItemType, TaskType } from "../types/task";
import { KanbanType } from "../types/kanban";
import { Kanban } from "../pages/auth/kanban/kanban";
import { EpicType } from "../types/epic";

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

export const apiTaskTypes = () => {
  return http<TaskType[]>(
    "/taskTypes",
    "GET",
    {},
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiKanbans = (projectId: string) => {
  return http<KanbanType[]>(
    "/kanbans",
    "GET",
    { projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiCreateKanban = ({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) => {
  return http<KanbanType>(
    "/kanbans",
    "POST",
    { name, projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiCreateTask = ({
  kanbanId,
  name,
  projectId,
}: {
  kanbanId: string;
  name: string;
  projectId: string;
}) => {
  return http<TaskItemType>(
    "/tasks",
    "POST",
    { kanbanId, name, projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiTasks = (projectId: string) => {
  return http<TaskItemType[]>(
    "/tasks",
    "GET",
    { projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiReorderKanban = ({
  fromId,
  fromKanbanId,
  referenceId,
  toKanbanId,
  type,
}: {
  fromId: number;
  fromKanbanId: number;
  referenceId: number;
  toKanbanId: number;
  type: string;
}) => {
  return http(
    "/tasks/reorder",
    "POST",
    { fromId, fromKanbanId, referenceId, toKanbanId, type },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiEpics = (projectId: string) => {
  return http<EpicType[]>(
    "/epics",
    "GET",
    { projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiDeleteEpic = (epicId: string) => {
  return http(
    `/epics/${epicId}`,
    "DELETE",
    {},
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiCreateEpic = ({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) => {
  return http(
    "/epics",
    "POST",
    { name, projectId },
    { token: getDataFromLocalStorage("__auth_provider_token__") }
  );
};

export const apiProject = () => {};
