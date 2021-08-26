import { Box } from '@chakra-ui/react';
import { useCounterContext } from '../useCounterContext';

const Count = () => {

    const { value } = useCounterContext();

    return (
        <Box padding="5px 7px" backgroundColor="#17a2b8">
            {value}
        </Box>
    )
}


export { Count };