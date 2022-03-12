import styles from "./card.module.css";
import { Button } from "@douyinfe/semi-ui";
import { useDeleteProject } from "../../../../utils/hooks/useDeleteProject";
import { useDeleteEpic } from "../../../../utils/hooks/useDeleteEpic";

export const Card = (props: {
  start: string;
  end: string;
  name: string;
  id: string;
}) => {
  const deleteEpicMutation = useDeleteEpic();

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles["c-header"]}`}>
        <h2>{props.name}</h2>
        <Button onClick={() => deleteEpicMutation.mutate({ epicId: props.id })}>
          删除
        </Button>
      </div>
      <div className={`${styles["c-time"]}`}>开始时间:{props.start}</div>
      <div className={`${styles["c-time"]}`}>结束时间:{props.end}</div>
    </div>
  );
};
