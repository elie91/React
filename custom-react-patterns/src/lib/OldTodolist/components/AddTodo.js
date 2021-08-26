import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
} from "@chakra-ui/react";
import { useTodolistContext } from '../useTodolistContext';

const AddTodo = ({ isOpen, onClose }) => {


    const { addTodo } = useTodolistContext();
    const [values, setValues] = useState({
        title: '',
        description: ''
    })

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const onSubmit = () => {
        if (values.title && values.description) {
            addTodo(values.title, values.description)
            onClose();
        }
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input my={3} placeholder="Todo title" name="title" required onChange={onChange} />
                    <Input my={3} placeholder="Todo description" name="description" required onChange={onChange} />
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme="blue" onClick={onSubmit}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddTodo;