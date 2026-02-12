"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { boardActions } from "@/features/board";
import { Board } from "@/features/board/types";
import { addBoardService } from "@/features/board/services";

export const useAddBoard = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);

  const addBoard = useCallback(
    async (title: string) => {
      const maxPosition = boards.reduce(
        (max, b) => Math.max(max, b.position),
        0,
      );
      const board: Board = {
        id: crypto.randomUUID(),
        title,
        position: maxPosition + 65535,
      };
      await addBoardService(board);
      dispatch(boardActions.addBoard(board));
      return board;
    },
    [dispatch, boards],
  );

  return { addBoard };
};
