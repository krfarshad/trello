"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import { taskActions } from "@/features/task";
import { deleteTaskService } from "@/features/task/services";

export const useDeleteTask = () => {
  const dispatch = useAppDispatch();

  const deleteTask = useCallback(
    async (taskId: string) => {
      await deleteTaskService(taskId);
      dispatch(taskActions.removeTask(taskId));
    },
    [dispatch],
  );

  return { deleteTask };
};
