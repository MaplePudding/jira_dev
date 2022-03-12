import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiCreateEpic, apiCreateProject, apiLogin } from "../../http";
import { useSearchParams } from "react-router-dom";
import { useSearchPanelParams } from "./useSearchPanel";
import { useCurProjectId } from "./useCurProjectId";

//optimistic update
export const useCreateEpic = () => {
  const queryClient = useQueryClient();
  const curProjectId = useCurProjectId();
  return useMutation(
    ({ name, projectId }: { name: string; projectId: string }) => {
      return apiCreateEpic({ name, projectId });
    },
    {
      onMutate: async ({
        name,
        projectId,
      }: {
        name: string;
        projectId: string;
      }) => {
        await queryClient.cancelQueries("epics");
        const previous = queryClient.getQueryData("epics");
        // @ts-ignore
        queryClient.setQueryData("epics", (old) => {
          // @ts-ignore
          old.push({
            name,
            start: new Date().getTime(),
            end: new Date().getTime(),
          });
          return old;
        });
        return previous;
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          "epics",
          //@ts-ignore
          context.previous
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries("epics");
      },
    }
  );
};
