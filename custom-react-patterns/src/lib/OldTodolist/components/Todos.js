import React from 'react';
import AddTodo from './AddTodo';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure,
    Flex,
    Button,
    Text
} from "@chakra-ui/react";
import { useTodolistContext } from '../useTodolistContext';

const Todos = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { todos, toggleTodo } = useTodolistContext();

    const handleClick = (todo) => toggleTodo(todo);

    return (
        <Flex flexDirection="column" w='100%'>
            <Button
                alignSelf="flex-end"
                my={4}
                colorScheme="blue"
                onClick={onOpen}>
                Add Todo
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Titre</Th>
                        <Th>Description</Th>
                        <Th>Status</Th>
                        <Th isNumeric>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {todos.map((todo, index) => {
                        return (
                            <Tr key={index}>
                                <Td>{todo.title}</Td>
                                <Td>{todo.description}</Td>
                                <Td>{todo.completed ? "Completed" : "Todo"}</Td>
                                <Td isNumeric>
                                    <Button colorScheme={todo.completed ? 'pink' : 'teal'} size="xs" onClick={() => handleClick(todo)}>
                                        {todo.completed ? 'Todo' : 'Complete'}
                                    </Button>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
            {todos.length === 0 && <Text textAlign='center'>No todo </Text>}
            <AddTodo isOpen={isOpen} onClose={onClose} />
        </Flex >

    )
}

export default Todos;