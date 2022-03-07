import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiCreateProject, apiLogin } from "../../http";
import { useSearchParams } from "react-router-dom";
import { useSearchPanelParams } from "./useSearchPanel";

//optimistic update
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const searchPanelParams = useSearchPanelParams();
  return useMutation(
    ({
      name,
      organization,
      personId,
    }: {
      name: string;
      organization: string;
      personId: string;
    }) => {
      return apiCreateProject(name, organization, personId);
    },
    {
      onMutate: async ({
        name,
        organization,
        personId,
      }: {
        name: string;
        organization: string;
        personId: string;
      }) => {
        await queryClient.cancelQueries([
          searchPanelParams.personId,
          searchPanelParams.name,
        ]);
        const previous = queryClient.getQueryData([
          searchPanelParams.personId,
          searchPanelParams.name,
        ]);
        // @ts-ignore
        queryClient.setQueryData(
          [searchPanelParams.personId, searchPanelParams.name],
          (old) => {
            // @ts-ignore
            old.push({
              name,
              organization,
              personId,
              created: new Date().getTime(),
            });
            return old;
          }
        );
        return previous;
      },
      onError: (err, newTodo, context) => {
        //@ts-ignore
        queryClient.setQueryData(
          [searchPanelParams.personId, searchPanelParams.name],
          context.previous
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          searchPanelParams.personId,
          searchPanelParams.name,
        ]);
      },
    }
  );
};

export const useSetCreateProject = () => {
  const [params, setSearchParams] = useSearchParams();
  return (newParams: { open: boolean }) => {
    if (newParams.open) {
      params.set("open", "");
    } else {
      params.delete("open");
    }

    setSearchParams(params);
  };
};

export const useShowCreateProject = () => {
  const [params, _] = useSearchParams();
  if (params.get("open") === null) {
    return false;
  }
  return true;
};
