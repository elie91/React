import React from 'react';

const CounterContext = React.createContext(null);

const CounterProvider = ({ value, children }) => {
    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}

const useCounterContext = () => {
    const context = React.useContext(CounterContext);
    if (context === undefined) {
        throw new Error('useCounterContext must be used within a CounterProvider');
    }

    return context;
}

export { CounterProvider, useCounterContext };