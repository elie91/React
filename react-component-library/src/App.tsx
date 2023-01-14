import React, { useState } from "react";
import "./App.css";
import Autocomplete from "./lib/autocomplete/Autocomplete";
import Counter from "./lib/counter/Counter";
import Text from "./lib/text/Text";

const genRand = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

const generateAutocompleteOptions = (num: number) => {
  const options = [];
  for (let i = 0; i < num; i++) {
    const randomString = genRand(12);
    options.push({
      key: randomString,
      text: randomString,
    });
  }
  return options;
};

function App() {
  const [count, setCount] = useState(0);

  const handleControlledChange = (newValue: number) => {
    setCount(newValue);
  };

  const handleUncontrolledChange = (newValue: number) => {
    console.log({ newValue });
  };

  const options = generateAutocompleteOptions(20000);
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

        <Text id="my-span" as="a">
          Span
        </Text>

        <Autocomplete
          options={options}
          placeholder="My placeholder"
          value={options[10].key}
        />
      </header>
    </div>
  );
}

export default App;
