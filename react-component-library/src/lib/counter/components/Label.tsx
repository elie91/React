import React from "react";
import styles from "../Counter.module.css";

export interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return <div className={styles.label}>{children}</div>;
};

export default Label;
