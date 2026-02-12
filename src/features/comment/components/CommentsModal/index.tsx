"use client";

import { useState, useEffect } from "react";
import { Task } from "@/features/task";
import { useComments, useAddComment } from "@/features/comment/hooks";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import styles from "./CommentsModal.module.scss";

interface CommentsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentsModal = (props: CommentsModalProps) => {
  const { task, isOpen, onClose } = props;
  const [text, setText] = useState("");
  const { comments, fetchComments } = useComments(task.id);
  const { addComment } = useAddComment();

  useEffect(() => {
    if (isOpen) fetchComments();
  }, [isOpen, fetchComments]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await addComment(task.id, text.trim());
    setText("");
  };

  return (
    <Modal
      title={`Comments for "${task.title}"`}
      isOpen={isOpen}
      onClose={onClose}
    >
      {comments.length === 0 ? (
        <p className={styles.emptyState}>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <div className={styles.commentMeta}>
                {comment.author} &middot;{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </div>
              <div className={styles.commentText}>{comment.text}</div>
            </li>
          ))}
        </ul>
      )}
      <textarea
        className={styles.textarea}
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className={styles.submitRow}>
        <Button onClick={handleSubmit}>Add Comment</Button>
      </div>
    </Modal>
  );
};
