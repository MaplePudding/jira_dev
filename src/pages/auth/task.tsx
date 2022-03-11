import { Header } from "../../components/header";
import styles from "./task.module.css";
import { Nav } from "@douyinfe/semi-ui";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Kanban } from "./kanban/kanban";
import { Epic } from "./epic/epic";

export const Task = () => {
  const [selectedKey, setSelectedKey] = useState<Array<string>>(["kanban"]);
  const navigate = useNavigate();

  return (
    <div className={"full-page flex-col-start"}>
      <Header />
      <div className={`flex-row-start ${styles.body}`}>
        <Nav
          defaultSelectedKeys={selectedKey}
          items={[
            { itemKey: "kanban", text: "看板" },
            { itemKey: "epic", text: "任务组" },
          ]}
          onSelect={(data) => {
            navigate(data.itemKey.toString());
            setSelectedKey([data.itemKey.toString()]);
          }}
        />
        <Routes>
          <Route path={"kanban"} element={<Kanban />} />
          <Route path={"epic"} element={<Epic />} />
          <Route index element={<Kanban />} />
        </Routes>
      </div>
    </div>
  );
};
