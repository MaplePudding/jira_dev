import logo from "../img/logo.svg";
import styles from "../pages/auth/components/header.module.css";
import { Dropdown, Button } from "@douyinfe/semi-ui";
import { useUsers } from "../utils/hooks/useUsers";
import { UserType } from "../types/user";
import { useLogout } from "../utils/hooks/useLogout";
import { useAuth } from "../context/auth";
import { useMe } from "../utils/hooks/useMe";
import { useSetCreateProject } from "../utils/hooks/useCreateProject";

const ProjectDropDown = () => {
  const setCreateProject = useSetCreateProject();

  return (
    <Dropdown
      render={
        <Dropdown.Menu>
          <Dropdown.Item
            style={{ color: "#0052D6" }}
            onClick={() => setCreateProject({ open: true })}
          >
            创建项目
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <div>项目</div>
    </Dropdown>
  );
};

const UserDropDown = ({ users }: { users: UserType[] | undefined }) => {
  const renderUserList = () => {
    return users?.map((v: UserType) => <Dropdown.Item>{v.name}</Dropdown.Item>);
  };

  return (
    <Dropdown render={<Dropdown.Menu>{renderUserList()}</Dropdown.Menu>}>
      <div>组员</div>
    </Dropdown>
  );
};

const LogoutDropDown = () => {
  const logout = useLogout();
  const { data, refetch } = useAuth();

  return (
    <Dropdown
      render={
        <Dropdown.Menu>
          <Button
            onClick={() => {
              logout();
              refetch();
            }}
          >
            退出登录
          </Button>
        </Dropdown.Menu>
      }
    >
      <div style={{ color: "#0052D6" }}>Hi～ {data?.user.name}</div>
    </Dropdown>
  );
};

export const Header = () => {
  const { data } = useUsers();

  return (
    <div className={`${styles.header}`}>
      <img src={logo} style={{ height: "85%" }} />
      <ProjectDropDown />
      <UserDropDown users={data} />
      <div></div>
      <LogoutDropDown />
    </div>
  );
};
