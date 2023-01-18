import React, { useState } from "react";
import "./App.css";
import { MuiSelect } from "./lib";
import Autocomplete from "./lib/components/autocomplete/Autocomplete";

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
      id: randomString,
      label: randomString,
    });
  }
  return options;
};

const options = generateAutocompleteOptions(1000);

function App() {
  const [value, setValue] = useState(options[2].id);
  return (
    <div className="App">
      <header className="App-header">
        {/*   <Counter initialValue={5} onChange={handleUncontrolledChange}>
          <Counter.Decrement icon="ri-home-5-line" />
          <Counter.Label>Uncontrolled counter</Counter.Label>
          <Counter.Count />
          <Counter.Increment />
        </Counter> */}
        <Autocomplete
          placeholder="My Autocomplete"
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </header>
    </div>
  );
}

export default App;
