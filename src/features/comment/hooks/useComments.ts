"use client";

import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { commentActions } from "@/features/comment";
import { commentListService } from "@/features/comment/services";

export const useComments = (taskId: string) => {
  const dispatch = useAppDispatch();
  const allComments = useAppSelector((state) => state.comments.comments);
  const [loading, setLoading] = useState(false);

  const comments = allComments
    .filter((c) => c.taskId === taskId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const data = await commentListService(taskId);
    dispatch(commentActions.setComments(data));
    setLoading(false);
  }, [dispatch, taskId]);

  return { comments, loading, fetchComments };
};
