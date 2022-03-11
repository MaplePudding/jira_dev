import styles from "./searchPanel.module.css";
import { Button, Input, Select } from "@douyinfe/semi-ui";
import { useTaskType } from "../../../../utils/hooks/useTaskTypes";
import { TaskType } from "../../../../types/task";
import {
  useSearchPanelParamsKanban,
  useSetSearchPanelParamsKanban,
} from "../../../../utils/hooks/useSearchPanel";
import { KanbanUserSelect } from "./kanbanUserSelect";

export const SearchPanel = () => {
  const { data } = useTaskType();
  const setParams = useSetSearchPanelParamsKanban();
  const generateTaskList = (list: TaskType[] | undefined) => {
    let optionList = list?.map((v) => {
      return {
        value: v.id,
        label: v.name,
      };
    });
    optionList?.unshift({ value: "", label: "类别" });
    return optionList;
  };

  return (
    <div className={`${styles.panel}`}>
      <Input
        style={{ padding: "0" }}
        className={`${styles["panel-input"]}`}
        placeholder="任务名"
        onChange={(v) => setParams({ name: v })}
      />
      <KanbanUserSelect />
      <Select
        onChange={(v) => setParams({ typeId: v?.toString() })}
        optionList={generateTaskList(data)}
        placeholder="类别"
      />
      <Button
        onClick={() => setParams({ name: "", processorId: "", typeId: "" })}
      >
        清除
      </Button>
    </div>
  );
};
