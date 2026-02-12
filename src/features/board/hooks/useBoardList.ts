"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { boardActions } from "@/features/board";
import { taskActions } from "@/features/task";
import { dbAdd, STORES } from "@/utils/indexDb";
import { Board } from "@/features/board/types";
import { Task } from "@/features/task";
import { getBoardsService } from "@/features/board/services";
import { seedBoards, seedTasks } from "@/config";

export const useBoardList = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const fetchBoards = useCallback(async () => {
    let data = await getBoardsService();

    if (data.length === 0) {
      for (const board of seedBoards) {
        await dbAdd<Board>(STORES.boards, board);
      }
      for (const task of seedTasks) {
        await dbAdd<Task>(STORES.tasks, task);
      }
      data = seedBoards;
      dispatch(taskActions.setTasks([...seedTasks]));
    }

    const sorted = data.sort((a, b) => a.position - b.position);
    dispatch(boardActions.setBoards(sorted));
    return sorted;
  }, [dispatch]);

  return { boards, fetchBoards };
};
