import { dbGetByIndex, STORES } from "@/utils/indexDb";
import { Comment } from "@/features/comment/types";

export const commentListService = async (
  taskId: string,
): Promise<Comment[]> => {
  return dbGetByIndex<Comment>(STORES.comments, "taskId", taskId);
};
