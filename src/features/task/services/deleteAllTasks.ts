import { dbDeleteByIndex, STORES } from "@/utils/indexDb";

export const deleteAllTasksService = async (
  boardId: string,
): Promise<void> => {
  await dbDeleteByIndex(STORES.tasks, "boardId", boardId);
};
