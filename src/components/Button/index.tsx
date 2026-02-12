"use client";

import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "ghost";
}

export const Button = (props: ButtonProps) => {
  const { variant = "primary", className, children, ...rest } = props;

  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
