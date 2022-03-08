import { ProjectType } from "../../../types/project";
import { Button, Form, Modal, Toast, useFormState } from "@douyinfe/semi-ui";
import { useEditProject } from "../../../utils/hooks/useEditProject";
import { useUsers } from "../../../utils/hooks/useUsers";
import { projects } from "jira-dev-tool/dist/server/initial-data";

export const EditModal = ({
  editKey,
  visible,
  setEditVisible,
  record,
}: {
  editKey: string;
  visible: boolean;
  setEditVisible: (flag: boolean) => void;
  record: any;
}) => {
  const { data } = useUsers();
  const Submit = () => {
    const form = useFormState();
    const mutation = useEditProject();
    if (mutation.isSuccess) {
      setEditVisible(false);
    }
    if (mutation.isError) {
      Toast.info("创建失败");
    }
    return (
      <Button
        block
        loading={mutation.isLoading}
        onClick={() => {
          mutation.mutate({ ...record, ...form.values, id: record.key });
          setEditVisible(false);
        }}
      >
        编辑项目
      </Button>
    );
  };
  const handleOk = () => {};
  const handleCancel = () => {
    setEditVisible(false);
  };
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
      style={{
        width: "350px",
        height: "400px",
      }}
      title="编辑项目"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
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
        <Form.Input field="name" initValue={record?.name} required />
        <Form.Input
          field="organization"
          initValue={record?.organization}
          required
        />
        <Form.Select
          style={{ width: "100%" }}
          initValue={record?.personId}
          field="personId"
          optionList={generateOptionList()}
        />
        <Submit />
      </Form>
    </Modal>
  );
};
