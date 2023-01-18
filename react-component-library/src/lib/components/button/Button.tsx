import React from "react";
import styles from "./Button.module.css";

type ColorScheme = "gray" | "red" | "orange" | "yellow" | "blue";

interface ButtonProps {
  colorScheme?: ColorScheme;
}

const getColorClassName = (colorScheme: ColorScheme) => {
  switch (colorScheme) {
    case "blue":
      return styles.blue;
    case "gray":
      return styles.gray;
    case "orange":
      return styles.orange;
    case "red":
      return styles.red;
    case "yellow":
      return styles.yellow;
    default:
      return styles.blue;
  }
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  colorScheme = "blue",
  children,
}) => {
  return (
    <button className={`${styles.button} ${getColorClassName(colorScheme)}`}>
      {children}
    </button>
  );
};

export default Button;
