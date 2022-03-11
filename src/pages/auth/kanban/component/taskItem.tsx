import { Draggable } from "react-beautiful-dnd";
import { TaskItemType } from "../../../../types/task";
import styles from "./taskItem.module.css";

export const TaskItem = (props: TaskItemType & { index: number }) => {
  return (
    <Draggable
      key={props.id}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={`${styles.item}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.name}
          </div>
        );
      }}
    </Draggable>
  );
};
