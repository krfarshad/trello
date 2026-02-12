import { dbDelete, dbDeleteByIndex, STORES } from "@/utils/indexDb";

export const deleteTaskService = async (taskId: string): Promise<void> => {
  await dbDeleteByIndex(STORES.comments, "taskId", taskId);
  await dbDelete(STORES.tasks, taskId);
};
