import React from 'react';

//high order component that return a component
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <div className='spinner-overlay'>
                <div className='spinner-container'></div>
            </div>
        ) : (
            <WrappedComponent {...otherProps} />
            )
    };
    return Spinner;
};

export default WithSpinner