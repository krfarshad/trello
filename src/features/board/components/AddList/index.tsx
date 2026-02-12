"use client";

import { useState, useRef, useEffect } from "react";
import { useAddBoard } from "@/features/board/hooks";
import { Button } from "@/components/Button";
import styles from "./AddList.module.scss";

export const AddList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addBoard } = useAddBoard();

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await addBoard(title.trim());
    setTitle("");
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setIsAdding(false);
    setTitle("");
  };

  if (!isAdding) {
    return (
      <button className={styles.addListBtn} onClick={() => setIsAdding(true)}>
        + Add another list
      </button>
    );
  }

  return (
    <div className={styles.form}>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Enter a list title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") handleClose();
        }}
      />
      <div className={styles.actions}>
        <Button onClick={handleSubmit}>Add list</Button>
        <button className={styles.closeBtn} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
