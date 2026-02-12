"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import { taskActions } from "@/features/task";
import { deleteAllTasksService } from "@/features/task/services";

export const useDeleteTasks = () => {
  const dispatch = useAppDispatch();

  const deleteTasks = useCallback(
    async (boardId: string) => {
      await deleteAllTasksService(boardId);
      dispatch(taskActions.removeTasksByBoard(boardId));
    },
    [dispatch],
  );

  return { deleteTasks };
};
