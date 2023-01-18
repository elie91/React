import React from "react";

type CounterContextInterface = {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

type CounterProviderProps = CounterContextInterface & {
  children: React.ReactNode;
};

const CounterContext = React.createContext<CounterContextInterface | null>(
  null
);

const CounterProvider: React.FC<CounterProviderProps> = ({
  count,
  handleDecrement,
  handleIncrement,
  children,
}) => {
  return (
    <CounterContext.Provider
      value={{
        count,
        handleDecrement,
        handleIncrement,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

const useCounterContext = () => {
  const context = React.useContext(CounterContext);
  if (!context) {
    throw new Error("useCounterContext must be used within a CounterProvider");
  }
  return context;
};

export { CounterProvider, useCounterContext };
