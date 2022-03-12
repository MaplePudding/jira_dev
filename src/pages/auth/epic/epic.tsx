import styles from "./epic.module.css";
import { ContentHeader } from "../../../components/contentHeader";
import { Button, Form, Input, Modal } from "@douyinfe/semi-ui";
import { useEpics } from "../../../utils/hooks/useEpics";
import { useCurProjectId } from "../../../utils/hooks/useCurProjectId";
import dayjs from "dayjs";
import { Card } from "./component/card";
import { useState } from "react";
import { useCreateEpic } from "../../../utils/hooks/useCreateEpid";

export const Epic = () => {
  const [showCreateModal, setCreateModal] = useState(false);
  const curProjectId = useCurProjectId();
  const createEpicMutation = useCreateEpic();
  const [epicName, setEpicName] = useState("");
  const { data } = useEpics(curProjectId ? curProjectId : "");

  return (
    <div
      className={`${styles.epic} flex-col-start`}
      style={{ height: "500px" }}
    >
      <ContentHeader
        text={"快递管理任务组"}
        Component={
          <Button onClick={() => setCreateModal(true)}>创建任务组</Button>
        }
      />
      <div className={`${styles["epic-body"]}`}>
        {data?.map((v, i, a) => {
          return (
            <Card
              id={v.id}
              name={v.name}
              start={dayjs(v.start).format("YYYY-MM-DD")}
              end={dayjs(v.end).format("YYYY-MM-DD")}
            />
          );
        })}
      </div>
      <Modal
        title="创建任务"
        visible={showCreateModal}
        footer={null}
        onCancel={() => setCreateModal(false)}
        style={{
          width: "350px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "spaceAround",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="任务名"
          onChange={(v) => setEpicName(v)}
          style={{ marginTop: "35px", marginBottom: "35px", width: "95%" }}
        />
        <Button
          onClick={() => {
            createEpicMutation.mutate({
              name: epicName,
              projectId: curProjectId ? curProjectId : "",
            });
            setCreateModal(false);
          }}
          style={{ marginBottom: "15px", width: "95%" }}
        >
          创建
        </Button>
      </Modal>
    </div>
  );
};
