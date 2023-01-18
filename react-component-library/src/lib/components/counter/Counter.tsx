import React, { useState } from "react";
import Count from "./components/Count";
import Decrement, { DecrementProps } from "./components/Decrement";
import Increment, { IncrementProps } from "./components/Increment";
import Label, { LabelProps } from "./components/Label";
import styles from "./Counter.module.css";
import { CounterProvider } from "./useCounterContext";

interface CounterProps {
  children: React.ReactNode;
  initialValue?: number;
  value?: number;
  onChange?: (count: number) => void;
}

interface CounterSubComponents {
  Increment: React.FC<IncrementProps>;
  Count: React.FC;
  Label: React.FC<LabelProps>;
  Decrement: React.FC<DecrementProps>;
}

const Counter: React.FC<CounterProps> & CounterSubComponents = ({
  initialValue = 0,
  value,
  onChange,
  children,
}) => {
  const [count, setCount] = useState(initialValue);
  const isControlled = !!value && !!onChange;

  const getCount = () => (isControlled ? value : count);

  const handleIncrement = () => {
    handleChange(getCount() + 1);
  };

  const handleDecrement = () => {
    handleChange(Math.max(0, getCount() - 1));
  };

  const handleChange = (newValue: number) => {
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setCount(newValue);
    }
  };

  return (
    <CounterProvider
      count={getCount()}
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
    >
      <div className={styles.counter}>{children}</div>
    </CounterProvider>
  );
};

Counter.Count = Count;
Counter.Increment = Increment;
Counter.Decrement = Decrement;
Counter.Label = Label;

export default Counter;
