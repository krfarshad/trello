"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { taskActions } from "@/features/task";
import { dbGetAll, STORES } from "@/utils/indexDb";
import { Task } from "@/features/task/types";

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const fetchTasks = useCallback(async () => {
    const data = await dbGetAll<Task>(STORES.tasks);
    dispatch(taskActions.setTasks(data));
    return data;
  }, [dispatch]);

  const getTasksByBoard = useCallback(
    (boardId: string) => {
      return tasks
        .filter((t) => t.boardId === boardId)
        .sort((a, b) => a.position - b.position);
    },
    [tasks],
  );

  return { tasks, fetchTasks, getTasksByBoard };
};
