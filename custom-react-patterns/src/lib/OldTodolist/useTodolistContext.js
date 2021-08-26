import React, { useState, useMemo } from 'react';

const TodolistContext = React.createContext(null);

const TodolistProvider = ({ children }) => {

    const [todos, setTodos] = useState([]);

    const addTodo = (title, description) => {
        setTodos(prev => [{ title, description, completed: false }, ...prev]);
    }

    const getCompletedTodos = useMemo(() => {
        return todos.filter(todo => todo.completed === true).length
    }, [todos])

    const getTodosToBeDone = useMemo(() => {
        return todos.filter(todo => todo.completed === false).length
    }, [todos]);

    const toggleTodo = (todo) => {
        setTodos(todos.map(t => {
            if (t.title === todo.title) {
                t.completed = !t.completed;
            }
            return t;
        }))
    }

    return (
        <TodolistContext.Provider value={{ todos, addTodo, toggleTodo, getCompletedTodos, getTodosToBeDone }}>
            {children}
        </TodolistContext.Provider>
    )
}

const useTodolistContext = () => {
    const context = React.useContext(TodolistContext);
    if (context === undefined) {
        throw new Error('useTodolistContext must be used inside TodolistProvider');
    }
    return context;
}

export { TodolistProvider, useTodolistContext }
