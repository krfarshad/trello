"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { taskActions } from "@/features/task";
import { addTaskService } from "@/features/task/services";

export const useAddTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const addTask = useCallback(
    async (boardId: string, title: string) => {
      const boardTasks = tasks.filter((t) => t.boardId === boardId);
      const maxPosition = boardTasks.reduce(
        (max, t) => Math.max(max, t.position),
        0,
      );
      const task = await addTaskService(boardId, title, maxPosition + 65535);
      dispatch(taskActions.addTask(task));
      return task;
    },
    [dispatch, tasks],
  );

  return { addTask };
};
