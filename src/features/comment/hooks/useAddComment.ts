"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import { commentActions } from "@/features/comment";
import { addCommentService } from "@/features/comment/services";

export const useAddComment = () => {
  const dispatch = useAppDispatch();

  const addComment = useCallback(
    async (taskId: string, text: string) => {
      const comment = await addCommentService(taskId, text);
      dispatch(commentActions.addComment(comment));
      return comment;
    },
    [dispatch],
  );

  return { addComment };
};
