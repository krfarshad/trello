"use client";

import {
  DndContext,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBoardList, useBoardDnd } from "@/features/board/hooks";
import { useTasks } from "@/features/task";
import { BoardList } from "@/features/board/components/BoardList";
import { AddList } from "@/features/board/components/AddList";
import styles from "./BoardContent.module.scss";

export const BoardContent = () => {
  const { boards } = useBoardList();
  const { getTasksByBoard } = useTasks();
  const { sensors, handleDragOver, handleDragEnd } = useBoardDnd();

  const listIds = boards.map((b) => `list-${b.id}`);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={listIds}
        strategy={horizontalListSortingStrategy}
      >
        <div className={styles.listsContainer}>
          {boards.map((board) => (
            <BoardList
              key={board.id}
              board={board}
              tasks={getTasksByBoard(board.id)}
            />
          ))}
          <AddList />
        </div>
      </SortableContext>
    </DndContext>
  );
};
