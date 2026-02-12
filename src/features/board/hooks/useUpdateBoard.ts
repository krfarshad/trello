"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { boardActions } from "@/features/board";
import { updateBoardService } from "@/features/board/services";

export const useUpdateBoard = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const updateBoard = useCallback(
    async (id: string, title: string) => {
      const board = boards.find((b) => b.id === id);
      if (!board) return;
      const updated = { ...board, title };
      await updateBoardService(updated);
      dispatch(boardActions.updateBoard({ id, title }));
    },
    [dispatch, boards],
  );

  return { updateBoard };
};
