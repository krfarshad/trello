"use client";

import { useCallback } from "react";
import {
  DragOverEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@/store";
import { boardActions } from "@/features/board";
import { taskActions } from "@/features/task";
import { Task } from "@/features/task";
import { Board } from "@/features/board/types";
import { dbPutAll, STORES } from "@/utils/indexDb";

export const useBoardDnd = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      if (activeData?.type !== "card") return;

      const activeTask = activeData.task as Task;
      let overBoardId: string | null = null;

      if (overData?.type === "card") {
        const overTask = overData.task as Task;
        overBoardId = overTask.boardId;
      } else if (overData?.type === "list") {
        overBoardId = overData.board.id;
      }

      if (!overBoardId || activeTask.boardId === overBoardId) return;

      dispatch(
        taskActions.moveTask({
          taskId: activeTask.id,
          toBoardId: overBoardId,
        }),
      );
    },
    [dispatch],
  );

  const reorderLists = useCallback(
    async (activeBoard: Board, overBoard: Board) => {
      const oldIndex = boards.findIndex((b) => b.id === activeBoard.id);
      const newIndex = boards.findIndex((b) => b.id === overBoard.id);

      if (oldIndex === newIndex) return;

      const reordered = arrayMove(boards, oldIndex, newIndex).map((b, i) => ({
        ...b,
        position: (i + 1) * 65535,
      }));

      dispatch(boardActions.reorderBoards(reordered));
      await dbPutAll(STORES.boards, reordered);
    },
    [boards, dispatch],
  );

  const reorderCards = useCallback(
    async (activeTask: Task, overData: { type: string; task?: Task; board?: Board } | undefined) => {
      let overBoardId = activeTask.boardId;
      let overTaskId: string | null = null;

      const currentTask = tasks.find((t) => t.id === activeTask.id);
      if (currentTask) {
        overBoardId = currentTask.boardId;
      }

      if (overData?.type === "card" && overData.task) {
        overBoardId = overData.task.boardId;
        overTaskId = overData.task.id;
      } else if (overData?.type === "list" && overData.board) {
        overBoardId = overData.board.id;
      }

      const boardTasks = tasks
        .filter((t) => t.boardId === overBoardId)
        .sort((a, b) => a.position - b.position);

      const currentIndex = boardTasks.findIndex(
        (t) => t.id === activeTask.id,
      );

      let newIndex = boardTasks.length;
      if (overTaskId) {
        newIndex = boardTasks.findIndex((t) => t.id === overTaskId);
      }

      if (currentIndex !== -1 && currentIndex !== newIndex) {
        const reorderedBoardTasks = arrayMove(
          boardTasks,
          currentIndex,
          newIndex,
        ).map((t, i) => ({ ...t, position: (i + 1) * 65535 }));

        const updatedTasks = tasks.map((t) => {
          const updated = reorderedBoardTasks.find((rt) => rt.id === t.id);
          return updated || t;
        });

        dispatch(taskActions.setTasks(updatedTasks));
        await dbPutAll(STORES.tasks, reorderedBoardTasks);
      } else if (currentIndex === -1) {
        const movedTask = {
          ...activeTask,
          boardId: overBoardId,
          position: (boardTasks.length + 1) * 65535,
        };
        const updatedTasks = tasks.map((t) =>
          t.id === activeTask.id ? movedTask : t,
        );

        dispatch(taskActions.setTasks(updatedTasks));
        await dbPutAll(STORES.tasks, [movedTask]);
      }
    },
    [tasks, dispatch],
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      if (activeData?.type === "list" && overData?.type === "list") {
        await reorderLists(activeData.board, overData.board);
      }

      if (activeData?.type === "card") {
        await reorderCards(activeData.task as Task, overData as { type: string; task?: Task; board?: Board });
      }
    },
    [reorderLists, reorderCards],
  );

  return { sensors, handleDragOver, handleDragEnd };
};
