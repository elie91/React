import { MinusIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { useCounterContext } from '../useCounterContext';

const Decrement = ({ icon }) => {
    const { onDecrement } = useCounterContext();

    return (
        icon ? <Icon as={icon} onClick={onDecrement} /> : <MinusIcon onClick={onDecrement} />
    )
}

export { Decrement };