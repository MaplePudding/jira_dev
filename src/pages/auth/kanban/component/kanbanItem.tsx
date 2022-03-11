import { KanbanType } from "../../../../types/kanban";
import styles from "./kanbanItem.module.css";
import { Droppable } from "react-beautiful-dnd";
import { useTaskItems } from "../../../../utils/hooks/useTaskItems";
import { useCurProjectId } from "../../../../utils/hooks/useCurProjectId";
import { TaskItem } from "./taskItem";
import { TaskItemType } from "../../../../types/task";

export const KanbanItem = (
  props: KanbanType & { taskItems: TaskItemType[] | undefined }
) => {
  return (
    <Droppable droppableId={props.id.toString()}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${styles.item} flex-col-start`}
        >
          <h2>{props.name}</h2>
          {props.taskItems?.map((v, i) => {
            if (v.kanbanId === props.id) {
              return (
                <TaskItem
                  epicId={v.epicId}
                  favorite={v.favorite}
                  id={v.id}
                  kanbanId={v.kanbanId}
                  name={v.name}
                  note={v.note}
                  ownerId={v.ownerId}
                  processorId={v.processorId}
                  projectId={v.projectId}
                  reporterId={v.reporterId}
                  tags={v.tags}
                  typeId={v.typeId}
                  index={Number(i)}
                />
              );
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
