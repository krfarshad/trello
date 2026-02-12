"use client";

import { useEffect } from "react";
import { useBoardList } from "@/features/board/hooks";
import { useTasks } from "@/features/task";
import { BoardHeader } from "@/features/board/components/BoardHeader";
import { BoardContent } from "@/features/board/components/BoardContent";
import styles from "./Board.module.scss";

export const Board = () => {
  const { fetchBoards } = useBoardList();
  const { fetchTasks } = useTasks();

  useEffect(() => {
    fetchBoards().then(() => fetchTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.board}>
      <BoardHeader />
      <BoardContent />
    </div>
  );
};
