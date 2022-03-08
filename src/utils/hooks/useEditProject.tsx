import { useMutation, useQueryClient } from "react-query";
import { useSearchPanelParams } from "./useSearchPanel";
import { apiDeleteProject, apiEditProject } from "../../http";
import { ProjectType } from "../../types/project";

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const searchPanelParams = useSearchPanelParams();
  return useMutation<ProjectType>(
    //@ts-ignore
    (project: ProjectType) => {
      return apiEditProject(project);
    },
    {
      onMutate: async (project: ProjectType) => {
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
            for (let p of old) {
              if (p.id === project.id) {
                p.name = project.name;
                p.organization = project.organization;
                p.personId = project.personId;
              }
            }
            return old;
          }
        );
        return previous;
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          [searchPanelParams.personId, searchPanelParams.name],
          //@ts-ignore
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
