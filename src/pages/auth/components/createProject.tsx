import { Button, Form, Modal, Toast, useFormState } from "@douyinfe/semi-ui";
import { UserSelect } from "../../../components/userSelect";
import {
  useCreateProject,
  useSetCreateProject,
} from "../../../utils/hooks/useCreateProject";
import { useUsers } from "../../../utils/hooks/useUsers";
import { useSetSearchPanelParams } from "../../../utils/hooks/useSearchPanel";
import { useQueryClient } from "react-query";

export const CreateProject = ({ visible }: { visible: boolean }) => {
  const setCreateProject = useSetCreateProject();

  const onOk = () => {};

  const onClose = () => {
    setCreateProject({ open: false });
  };

  const Submit = () => {
    const form = useFormState();
    const mutation = useCreateProject();
    if (mutation.isSuccess) {
      Toast.info("创建成功");
      setCreateProject({ open: false });
    }
    if (mutation.isError) {
      Toast.info("创建失败");
    }
    return (
      <Button
        block
        loading={mutation.isLoading}
        onClick={() => {
          mutation.mutate(form.values);
          setCreateProject({ open: false });
        }}
      >
        创建项目
      </Button>
    );
  };

  const { data } = useUsers();
  const generateOptionList = () => {
    const list = data?.map((v) => {
      return {
        value: v.id,
        label: v.name,
        otherKey: v.id,
      };
    });
    list?.unshift({ value: "", label: "负责人", otherKey: "" });
    return list;
  };

  return (
    <Modal
      title="创建项目"
      fullScreen
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      footer={null}
      style={{
        padding: "200px 600px 200px 600px",
      }}
    >
      <Form
        labelPosition="inset"
        style={{
          height: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "stretch",
        }}
      >
        <Form.Input field="name" required />
        <Form.Input field="organization" required />
        <Form.Select
          style={{ width: "100%" }}
          field="personId"
          optionList={generateOptionList()}
        />
        <Submit />
      </Form>
    </Modal>
  );
};
