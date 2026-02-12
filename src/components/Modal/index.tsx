"use client";

import { PropsWithChildren, useEffect } from "react";
import styles from "./Modal.module.scss";

interface ModalProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = (props: ModalProps) => {
  const { title, isOpen, onClose, children } = props;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
