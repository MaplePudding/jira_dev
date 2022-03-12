import styles from "./kanban.module.css";
import { SearchPanel } from "./component/searchPanel";
import { Core } from "./component/core";

export const Kanban = () => {
  return (
    <div className={`${styles.kanban} flex-col-start`}>
      <h1 className={`${styles["kanban-h"]}`}>项目管理看板</h1>
      <SearchPanel />
      <Core />
    </div>
  );
};
