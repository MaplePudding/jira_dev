import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiReorderKanban } from "../../http";

//optimistic update
export const useDropItem = () => {
  const queryClient = useQueryClient();
  //@ts-ignore
  return useMutation(
    ({
      fromId,
      fromKanbanId,
      referenceId,
      toKanbanId,
      type,
    }: {
      fromId: number;
      fromKanbanId: number;
      referenceId: number;
      toKanbanId: number;
      type: string;
    }) => {
      return apiReorderKanban({
        fromId,
        fromKanbanId,
        referenceId,
        toKanbanId,
        type,
      });
    },
    {
      onMutate: async ({
        fromId,
        fromKanbanId,
        referenceId,
        toKanbanId,
        type,
      }: {
        fromId: number;
        fromKanbanId: number;
        referenceId: number;
        toKanbanId: number;
        type: string;
      }) => {
        await queryClient.cancelQueries("tasks");
        const previous = queryClient.getQueryData("tasks");
        // @ts-ignore
        queryClient.setQueryData("tasks", (old) => {
          console.log(old);
          // @ts-ignore
          old.forEach((v, i) => {
            if (v.id == fromId) {
              v.kanbanId = toKanbanId;
            }
          });
          return old;
        });
        return previous;
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          "tasks",
          //@ts-ignore
          context.previous
        );
      },
      onSettled: () => {
        return queryClient.invalidateQueries("tasks");
      },
    }
  );
};
