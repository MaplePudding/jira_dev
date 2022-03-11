import { useSearchParams } from "react-router-dom";
import { cleanEmptyString, cleanObject } from "../index";

const PARAMS_NAME = "name";
const PARAMS_PERSONID = "personId";
const PARAMS_TYPEID = "typeId";
const PARAMS_PROCESSORID = "processorId";

export const useSearchPanelParams = () => {
  const [searchParams, _] = useSearchParams();
  return cleanObject({
    [PARAMS_NAME]: searchParams.get(PARAMS_NAME),
    [PARAMS_PERSONID]: searchParams.get(PARAMS_PERSONID),
  });
};

export const useSearchPanelParamsKanban = () => {
  const [searchParams, _] = useSearchParams();
  return cleanObject({
    [PARAMS_TYPEID]: searchParams.get(PARAMS_TYPEID),
    [PARAMS_PROCESSORID]: searchParams.get(PARAMS_PROCESSORID),
    [PARAMS_NAME]: searchParams.get(PARAMS_NAME),
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

//maybe loop
export const useSetSearchPanelParamsKanban = () => {
  const [params, setSearchParams] = useSearchParams();
  return (newParams: {
    name?: string;
    processorId?: string;
    typeId?: string;
  }) => {
    if (newParams.name === "") {
      params.delete(PARAMS_NAME);
    }
    if (newParams.processorId === "") {
      params.delete(PARAMS_PROCESSORID);
    }
    if (newParams.typeId === "") {
      params.delete(PARAMS_TYPEID);
    }
    if (newParams.name) {
      params.set(PARAMS_NAME, newParams.name);
    }
    if (newParams.processorId) {
      params.set(PARAMS_PROCESSORID, newParams.processorId);
    }
    if (newParams.typeId) {
      params.set(PARAMS_TYPEID, newParams.typeId);
    }
    setSearchParams(params);
  };
};
