import styles from "./core.module.css";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Simulate } from "react-dom/test-utils";
import { useKanbans } from "../../../../utils/hooks/useKanbans";
import { useCurProjectId } from "../../../../utils/hooks/useCurProjectId";
import { KanbanItem } from "./kanbanItem";
import { useTaskItems } from "../../../../utils/hooks/useTaskItems";
import { useDropItem } from "../../../../utils/hooks/useDropItem";
export const Core = () => {
  const reorder = useDropItem();
  const curProjectId = useCurProjectId();
  const projectId = useCurProjectId();
  const { data: taskItems } = useTaskItems(curProjectId ? curProjectId : "");
  const dragEnd = (result: any) => {
    return reorder.mutate({
      fromId: Number(result.draggableId),
      fromKanbanId: Number(result.source.droppableId),
      toKanbanId: Number(result.destination.droppableId),
      referenceId: Number(
        taskItems?.filter((v) => v.kanbanId == result.destination.droppableId)[
          result.destination.index - 1
        ].id
      ),
      type: "after",
    });
  };
  const dragStart = (result: any) => {};
  const { data: kanbans } = useKanbans(projectId ? projectId : "");

  return (
    <div
      className={`${styles.core} flex-row-start`}
      style={{ height: "480px" }}
    >
      <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
        {kanbans?.map((v) => {
          return (
            <KanbanItem
              taskItems={taskItems}
              ownerId={v.ownerId}
              name={v.name}
              id={v.id}
              projectId={v.projectId}
              key={v.id}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};
