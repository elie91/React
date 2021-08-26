import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTodolistContext } from '../useTodolistContext';

const Stats = () => {

    const { todos, getCompletedTodos, getTodosToBeDone } = useTodolistContext();

    return (
        <Box textAlign='center'>
            <Text fontSize='lg' fontWeight='bold'>{todos.length} Todos</Text>
            <Text fontSize='lg' fontWeight='bold'>{getCompletedTodos} completed</Text>
            <Text fontSize='lg' fontWeight='bold'>{getTodosToBeDone} todo</Text>
        </Box >

    )
}

export default Stats;