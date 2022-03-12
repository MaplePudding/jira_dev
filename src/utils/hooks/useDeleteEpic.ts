import { useQuery } from "react-query";
import { apiDeleteEpic } from "../../http";

import { useMutation, useQueryClient } from "react-query";
import { useSearchPanelParams } from "./useSearchPanel";
import { apiDeleteProject } from "../../http";

export const useDeleteEpic = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ epicId }: { epicId: string }) => {
      return apiDeleteEpic(epicId);
    },
    {
      onMutate: async ({ epicId }: { epicId: string }) => {
        await queryClient.cancelQueries("epics");
        const previous = queryClient.getQueryData("epics");
        queryClient.setQueryData("epics", (old) => {
          // @ts-ignore
          return old.filter((v) => v.id !== epicId);
        });
        return previous;
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          "epics",
          //@ts-ignore
          context.previousTodos
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries("epics");
      },
    }
  );
};
