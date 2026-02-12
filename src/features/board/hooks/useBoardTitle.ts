"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { boardActions } from "@/features/board";

export const useBoardTitle = () => {
  const dispatch = useAppDispatch();
  const boardTitle = useAppSelector((state) => state.boards.boardTitle);

  const setBoardTitle = useCallback(
    (title: string) => {
      dispatch(boardActions.setBoardTitle(title));
    },
    [dispatch],
  );

  return { boardTitle, setBoardTitle };
};
