"use client";

import { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Board } from "@/features/board/types";
import { Task, BoardCard, AddCard } from "@/features/task";
import { useUpdateBoard } from "@/features/board/hooks";
import { ListActions } from "@/features/board/components/ListActions";
import styles from "./BoardList.module.scss";

interface BoardListProps {
  board: Board;
  tasks: Task[];
}

export const BoardList = (props: BoardListProps) => {
  const { board, tasks } = props;
  const { updateBoard } = useUpdateBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(board.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `list-${board.id}`,
    data: { type: "list", board },
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: `droppable-${board.id}`,
    data: { type: "list", board },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleSubmit = async () => {
    if (editValue.trim() && editValue.trim() !== board.title) {
      await updateBoard(board.id, editValue.trim());
    } else {
      setEditValue(board.title);
    }
    setIsEditing(false);
  };

  const cardIds = tasks.map((t) => `card-${t.id}`);

  return (
    <div
      ref={setSortableRef}
      style={style}
      className={`${styles.list} ${isDragging ? styles.dragging : ""}`}
    >
      <div className={styles.listHeader} {...attributes} {...listeners}>
        {isEditing ? (
          <input
            ref={inputRef}
            className={styles.listTitleInput}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSubmit();
              if (e.key === "Escape") {
                setEditValue(board.title);
                setIsEditing(false);
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
          />
        ) : (
          <button
            className={styles.listTitle}
            onClick={() => {
              setEditValue(board.title);
              setIsEditing(true);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {board.title}
          </button>
        )}
        <div onPointerDown={(e) => e.stopPropagation()}>
          <ListActions boardId={board.id} />
        </div>
      </div>

      <div className={styles.cards} ref={setDroppableRef}>
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <BoardCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      <div className={styles.footer}>
        <AddCard boardId={board.id} />
      </div>
    </div>
  );
};
