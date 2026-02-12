"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/features/task/types";
import { useAppSelector } from "@/store";
import { CommentsModal } from "@/features/comment";
import styles from "./BoardCard.module.scss";

interface BoardCardProps {
  task: Task;
}

export const BoardCard = (props: BoardCardProps) => {
  const { task } = props;
  const [showComments, setShowComments] = useState(false);
  const comments = useAppSelector((state) => state.comments.comments);
  const commentCount = comments.filter((c) => c.taskId === task.id).length;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `card-${task.id}`,
    data: { type: "card", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
        {...attributes}
        {...listeners}
      >
        <div className={styles.cardTitle}>{task.title}</div>
        <div className={styles.cardFooter}>
          <button
            className={styles.commentBadge}
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(true);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            Comments ({commentCount})
          </button>
        </div>
      </div>
      {showComments && (
        <CommentsModal
          task={task}
          isOpen={showComments}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};
