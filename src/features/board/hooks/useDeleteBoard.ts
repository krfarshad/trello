"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import { boardActions } from "@/features/board";
import { taskActions } from "@/features/task";
import { dbDeleteByIndex, STORES } from "@/utils/indexDb";
import { deleteBoardService } from "@/features/board/services";

export const useDeleteBoard = () => {
  const dispatch = useAppDispatch();

  const deleteBoard = useCallback(
    async (id: string) => {
      await dbDeleteByIndex(STORES.tasks, "boardId", id);
      await deleteBoardService(id);
      dispatch(taskActions.removeTasksByBoard(id));
      dispatch(boardActions.removeBoard(id));
    },
    [dispatch],
  );

  return { deleteBoard };
};
