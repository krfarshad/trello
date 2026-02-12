"use client";

import { useState, useRef, useEffect } from "react";
import { useBoardTitle } from "@/features/board/hooks";
import styles from "./BoardHeader.module.scss";

export const BoardHeader = () => {
  const { boardTitle, setBoardTitle } = useBoardTitle();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(boardTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (editValue.trim()) {
      setBoardTitle(editValue.trim());
    } else {
      setEditValue(boardTitle);
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.header}>
      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.titleInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setEditValue(boardTitle);
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <button
          className={styles.title}
          onClick={() => {
            setEditValue(boardTitle);
            setIsEditing(true);
          }}
        >
          {boardTitle}
        </button>
      )}
    </div>
  );
};
