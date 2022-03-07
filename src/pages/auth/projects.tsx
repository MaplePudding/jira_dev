import styles from "./projects.module.css";
import { Header } from "./components/header";
import {
  Button,
  Dropdown,
  Form,
  Modal,
  Rating,
  Table,
  useFormState,
} from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { SearchPanel } from "./components/searchPanel";
import { useProjects } from "../../utils/hooks/useProjects";
import { useUsers } from "../../utils/hooks/useUsers";
import { ProjectType } from "../../types/project";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { CreateProject } from "./components/createProject";
import {
  useSetCreateProject,
  useShowCreateProject,
} from "../../utils/hooks/useCreateProject";
import { useState } from "react";
import { useDeleteProject } from "../../utils/hooks/useDeleteProject";
import { useEditProject } from "../../utils/hooks/useEditProject";

const DeleteModal = ({
  deleteKey,
  visible,
  setDeleteVisible,
}: {
  deleteKey: string;
  visible: boolean;
  setDeleteVisible: (flag: boolean) => void;
}) => {
  const mutation = useDeleteProject();
  const handleOk = () => {
    mutation.mutate({ key: deleteKey });
    setDeleteVisible(false);
  };
  const handleCancel = () => {
    setDeleteVisible(false);
  };
  return (
    <Modal
      title="确定要删除此项目吗"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    ></Modal>
  );
};

//const EditModal = ({deleteKey, visible, setDeleteVisible, record}:{deleteKey:string, visible:boolean,setDeleteVisible: (flag:boolean) => void, record:any}) =>{
//    const mutation = useEditProject()
//    const handleOk = () =>{
//        mutation.mutate({key:deleteKey})
//        setDeleteVisible(false)
//    }
//    const handleCancel = () =>{
//        setDeleteVisible(false)
//    }
//    return(
//        <Modal
//            title="编辑项目"
//            visible={visible}
//            onOk={handleOk}
//            onCancel={handleCancel}
//        >
//
//        </Modal>
//    )
//}
export const Projects = () => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [params, _] = useSearchParams();
  const debounceName = useDebounce<string | null>(params.get("name"), 1000);
  const { data: projects, isLoading } = useProjects(
    params.get("personId"),
    debounceName
  );
  const { data: users } = useUsers();
  const setCreateProject = useSetCreateProject();
  const visible = useShowCreateProject();

  const columns = [
    {
      title: "收藏",
      render: (text: string, record: any) => {
        return (
          <div>
            <Rating count={1} defaultValue={0} />
            {text}
          </div>
        );
      },
      dataIndex: "rate",
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      dataIndex: "personName",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
    },
    {
      title: "",
      dataIndex: "more",
      render: (text: string, record: any) => {
        const key = record.key;
        return (
          <Dropdown
            render={
              <Dropdown.Menu>
                <Dropdown.Item>编辑</Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setDeleteKey(key);
                    setDeleteVisible(true);
                  }}
                >
                  删除
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconMore />
          </Dropdown>
        );
      },
    },
  ];

  const generateTableSource = () => {
    return (
      projects?.map((v: ProjectType) => {
        return {
          key: v.id,
          name: v.name,
          createdTime: dayjs(Number(v.created)).format("YYYY-MM-DD"),
          personName: users?.filter((u) => u.id === v.personId)?.length
            ? (users?.filter((u) => u.id === v.personId))[0].name
            : "未知",
          organization: v.organization,
        };
      }) || []
    );
  };

  return (
    <div className={"full-page flex-col-start"}>
      <Header />
      <div className={`${styles["project-body"]} flex-co-start`}>
        <div className={`${styles["project-body-h"]}`}>
          <h1>项目列表</h1>
          <Button onClick={() => setCreateProject({ open: true })}>
            创建项目
          </Button>
        </div>
        <SearchPanel />
        <Table columns={columns} dataSource={generateTableSource()} />
      </div>
      <CreateProject visible={visible} />
      <DeleteModal
        setDeleteVisible={setDeleteVisible}
        deleteKey={deleteKey}
        visible={deleteVisible}
      />
    </div>
  );
};
