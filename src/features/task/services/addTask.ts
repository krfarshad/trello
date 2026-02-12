import { dbAdd, STORES } from "@/utils/indexDb";
import { Task } from "@/features/task/types";

export const addTaskService = async (
  boardId: string,
  title: string,
  position: number,
): Promise<Task> => {
  const task: Task = {
    id: crypto.randomUUID(),
    boardId,
    title,
    position,
  };
  await dbAdd(STORES.tasks, task);
  return task;
};
