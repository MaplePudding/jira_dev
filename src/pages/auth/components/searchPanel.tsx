import styles from "./searchPanel.module.css";
import { Input, Select } from "@douyinfe/semi-ui";
import { useSearchParams } from "react-router-dom";
import { useSetSearchPanelParams } from "../../../utils/hooks/useSearchPanel";
import { useUsers } from "../../../utils/hooks/useUsers";
import { UserSelect } from "../../../components/userSelect";

export const SearchPanel = () => {
  const setSearchParams = useSetSearchPanelParams();

  return (
    <div className={`${styles["search-panel"]}`}>
      <Input
        placeholder="项目名"
        style={{ width: "200px" }}
        onChange={(v) => setSearchParams({ name: v })}
      />
      {/*@ts-ignore*/}
      <UserSelect />
    </div>
  );
};
