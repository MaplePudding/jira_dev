import { useUsers } from "../../../../utils/hooks/useUsers";
import { Select } from "@douyinfe/semi-ui";
import { useSetSearchPanelParamsKanban } from "../../../../utils/hooks/useSearchPanel";

interface props {}

export const KanbanUserSelect = (props: props) => {
  const { data } = useUsers();
  const setSearchParams = useSetSearchPanelParamsKanban();
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
    <Select
      placeholder="负责人"
      optionList={generateOptionList()}
      //@ts-ignore
      onChange={(v) => setSearchParams({ processorId: v })}
    />
  );
};
