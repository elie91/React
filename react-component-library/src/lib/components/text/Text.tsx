import React from "react";

type TextColor = "red" | "blue" | "black" | "white";

type TextProps<T extends React.ElementType> = {
  as?: T;
  color?: TextColor | "black";
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const Text = <T extends React.ElementType = "span">({
  as,
  children,
  ...restProps
}: TextProps<T>) => {
  const Component = as || "span";
  return <Component {...restProps}>{children}</Component>;
};

export default Text;
