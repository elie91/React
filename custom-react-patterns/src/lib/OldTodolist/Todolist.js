import React from 'react';
import Todos from './components/Todos';
import Stats from './components/Stats';
import { Box } from '@chakra-ui/react';
import { TodolistProvider } from './useTodolistContext';

const Todolist = () => {

    return (
        <TodolistProvider>
            <Box w='100%'>
                <Stats />
                <Todos />
            </Box>
        </TodolistProvider>

    )
}

export default Todolist;