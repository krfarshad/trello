import { dbAdd, STORES } from "@/utils/indexDb";
import { Comment } from "@/features/comment/types";

export const addCommentService = async (
  taskId: string,
  text: string,
): Promise<Comment> => {
  const comment: Comment = {
    id: crypto.randomUUID(),
    taskId,
    text,
    author: "You",
    createdAt: new Date().toISOString(),
  };
  await dbAdd(STORES.comments, comment);
  return comment;
};
