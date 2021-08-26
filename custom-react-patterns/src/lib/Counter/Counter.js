import React, { useState, useCallback } from 'react';
import { ChakraProvider, Button } from "@chakra-ui/react";
import { Count, Increment, Decrement, Label } from "./components";
import { CounterProvider } from './useCounterContext';

const Counter = ({
    value = null,
    onChange,
    initialValue = 0,
    label,
    max = null,
    addIcon,
    minusIcon
}) => {

    const [count, setCount] = useState(initialValue);

    const isControlled = value !== null && !!onChange;

    const getCount = () => {
        return isControlled ? value : count
    };

    const onIncrement = () => {
        if (max && (getCount() + 1) > max) return;
        handleCountChange(getCount() + 1);
    }

    const onDecrement = () => {
        handleCountChange(Math.max(0, getCount() - 1));
    }

    const handleCountChange = useCallback((newValue) => {
        return isControlled ? onChange(newValue) : setCount(newValue);
    }, []);

    return (
        <ChakraProvider>
            <CounterProvider value={{ value: getCount(), onIncrement, onDecrement }}>
                <Button
                    leftIcon={<Decrement icon={minusIcon} />}
                    rightIcon={<Increment icon={addIcon} />}
                    colorScheme="teal"
                    variant="solid">
                    <Label text={label} />
                    <Count max={max} />
                </Button>
            </CounterProvider>
        </ChakraProvider>

    );
}

export default Counter;