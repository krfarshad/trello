"use client";

import { useState, useRef, useEffect } from "react";
import { useAddTask } from "@/features/task/hooks";
import { Button } from "@/components/Button";
import styles from "./AddCard.module.scss";

interface AddCardProps {
  boardId: string;
}

export const AddCard = (props: AddCardProps) => {
  const { boardId } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addTask } = useAddTask();

  useEffect(() => {
    if (isAdding && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await addTask(boardId, title.trim());
    setTitle("");
    textareaRef.current?.focus();
  };

  const handleClose = () => {
    setIsAdding(false);
    setTitle("");
  };

  if (!isAdding) {
    return (
      <button className={styles.addCardBtn} onClick={() => setIsAdding(true)}>
        + Add another card
      </button>
    );
  }

  return (
    <div className={styles.form}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder="Enter a card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === "Escape") handleClose();
        }}
      />
      <div className={styles.actions}>
        <Button onClick={handleSubmit}>Create card</Button>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
