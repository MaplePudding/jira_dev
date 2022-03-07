import { Select } from "@douyinfe/semi-ui";
import { useUsers } from "../utils/hooks/useUsers";
import { useSetSearchPanelParams } from "../utils/hooks/useSearchPanel";

interface props {}

export const UserSelect = (props: props) => {
  const { data } = useUsers();
  const setSearchParams = useSetSearchPanelParams();
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
    //@ts-ignore
    <Select
      placeholder="负责人"
      optionList={generateOptionList()}
      onChange={(v) => setSearchParams({ personId: v })}
    />
  );
};
