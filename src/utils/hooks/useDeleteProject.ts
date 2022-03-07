import { useMutation, useQueryClient } from "react-query";
import { useSearchPanelParams } from "./useSearchPanel";
import { apiDeleteProject } from "../../http";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const searchPanelParams = useSearchPanelParams();
  return useMutation(
    ({ key }: { key: string }) => {
      return apiDeleteProject(key);
    },
    {
      onMutate: async ({ key }: { key: string }) => {
        await queryClient.cancelQueries([
          searchPanelParams.personId,
          searchPanelParams.name,
        ]);
        const previous = queryClient.getQueryData([
          searchPanelParams.personId,
          searchPanelParams.name,
        ]);
        queryClient.setQueryData(
          [searchPanelParams.personId, searchPanelParams.name],
          (old) => {
            // @ts-ignore
            return old.filter((v) => v.id !== key);
          }
        );
        return previous;
      },
      onError: (err, newTodo, context) => {
        //@ts-ignore
        queryClient.setQueryData(
          [searchPanelParams.personId, searchPanelParams.name],
          context.previousTodos
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
