"use client";

import { useState, useRef, useEffect } from "react";
import { useDeleteBoard } from "@/features/board/hooks";
import { useDeleteTasks } from "@/features/task";
import { Button } from "@/components/Button";
import styles from "./ListActions.module.scss";

interface ListActionsProps {
  boardId: string;
}

export const ListActions = (props: ListActionsProps) => {
  const { boardId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "deleteCards">("menu");
  const popoverRef = useRef<HTMLDivElement>(null);
  const { deleteBoard } = useDeleteBoard();
  const { deleteTasks } = useDeleteTasks();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setView("menu");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDeleteList = async () => {
    await deleteBoard(boardId);
    setIsOpen(false);
  };

  const handleDeleteAllCards = async () => {
    await deleteTasks(boardId);
    setIsOpen(false);
    setView("menu");
  };

  return (
    <div className={styles.wrapper} ref={popoverRef}>
      <button
        className={styles.menuBtn}
        onClick={() => {
          setIsOpen(!isOpen);
          setView("menu");
        }}
      >
        &middot;&middot;&middot;
      </button>

      {isOpen && (
        <div className={styles.popover}>
          {view === "menu" && (
            <>
              <div className={styles.popoverHeader}>
                <span className={styles.popoverTitle}>List Actions</span>
                <button
                  className={styles.popoverClose}
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>
              </div>
              <button className={styles.menuItem} onClick={handleDeleteList}>
                Delete List
              </button>
              <button
                className={styles.menuItem}
                onClick={() => setView("deleteCards")}
              >
                Delete All Cards
              </button>
            </>
          )}

          {view === "deleteCards" && (
            <>
              <div className={styles.popoverHeader}>
                <button
                  className={styles.backBtn}
                  onClick={() => setView("menu")}
                >
                  &lsaquo;
                </button>
                <span className={styles.popoverTitle}>Delete All Cards</span>
                <button
                  className={styles.popoverClose}
                  onClick={() => {
                    setIsOpen(false);
                    setView("menu");
                  }}
                >
                  &times;
                </button>
              </div>
              <p className={styles.confirmText}>
                This will remove all the cards in this list from the board.
              </p>
              <div className={styles.confirmActions}>
                <Button variant="danger" onClick={handleDeleteAllCards}>
                  Delete all
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
