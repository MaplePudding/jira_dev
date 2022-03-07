import { useSearchParams } from "react-router-dom";
import { cleanEmptyString, cleanObject } from "../index";

const PARAMS_NAME = "name";
const PARAMS_PERSONID = "personId";

export const useSearchPanelParams = () => {
  const [searchParams, _] = useSearchParams();
  return cleanObject({
    [PARAMS_NAME]: searchParams.get(PARAMS_NAME),
    [PARAMS_PERSONID]: searchParams.get(PARAMS_PERSONID),
  });
};

export const useSetSearchPanelParams = () => {
  const [params, setSearchParams] = useSearchParams();
  return (newParams: { name?: string; personId?: string }) => {
    if (newParams.name === "") {
      params.delete(PARAMS_NAME);
    }
    if (newParams.personId === "") {
      params.delete(PARAMS_PERSONID);
    }
    if (newParams.name) {
      params.set(PARAMS_NAME, newParams.name);
    }
    if (newParams.personId) {
      params.set(PARAMS_PERSONID, newParams.personId);
    }
    setSearchParams(params);
  };
};
