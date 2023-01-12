import React, { useState } from "react";
import "./App.css";
import Counter from "./lib/counter/Counter";

function App() {
  const [count, setCount] = useState(0);

  const handleControlledChange = (newValue: number) => {
    setCount(newValue);
  };

  const handleUncontrolledChange = (newValue: number) => {
    console.log({ newValue });
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Controlled count : {count}</p>

        <Counter value={count} onChange={handleControlledChange}>
          <Counter.Decrement />
          <Counter.Label>Controlled counter</Counter.Label>
          <Counter.Count />
          <Counter.Increment />
        </Counter>

        <Counter initialValue={5} onChange={handleUncontrolledChange}>
          <Counter.Decrement icon="ri-home-5-line" />
          <Counter.Label>Uncontrolled counter</Counter.Label>
          <Counter.Count />
          <Counter.Increment />
        </Counter>
      </header>
    </div>
  );
}

export default App;
