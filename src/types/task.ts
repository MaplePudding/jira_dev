export interface TaskType {
  ownerId: string;
  name: string;
  id: string;
}

export interface TaskItemType {
  epicId: string;
  favorite: boolean;
  id: string;
  kanbanId: string;
  name: string;
  note: string;
  ownerId: string;
  processorId: string;
  projectId: string;
  reporterId: string;
  tags: Number[];
  typeId: string;
}
