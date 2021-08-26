import React, { useState } from 'react';
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Counter } from "./lib/Counter";
// import { Todolist } from "./lib/Todolist";


function App() {

  const [value, setValue] = useState(0);

  const handleChange = (newCount) => {
    setValue(newCount);
  }

  return (
    <ChakraProvider>
      <Box textAlign="center" w='100%' height='100vh' backgroundColor='#f8f9fa'>
        <Box padding="10px 0" color="white" backgroundColor='blue'>
          <h1>Advanced React Patterns</h1>
        </Box>

        <Box padding="30px" borderBottom="1px solid grey">
          <h1>Counter</h1>
          <Counter
            value={value}
            onChange={handleChange}
            label="counter"
            max={10}
          />
        </Box>

        <Box padding="30px" borderBottom="1px solid grey">
          <h1>Todolist</h1>
          {/*    <Todolist /> */}
        </Box>

      </Box>
    </ChakraProvider >

  );
}

export default App;
