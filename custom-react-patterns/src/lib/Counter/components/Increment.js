import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { useCounterContext } from '../useCounterContext';


const Increment = ({ icon }) => {

    const { onIncrement } = useCounterContext();

    console.log('INNN')

    return (
        icon ? <Icon as={icon} onClick={onIncrement} /> : <AddIcon onClick={onIncrement} />
    )
}

export { Increment };