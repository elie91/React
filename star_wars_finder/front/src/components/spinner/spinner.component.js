import React from 'react';
import './spinner.style.scss';


const Spinner = () => (
    <div className='spinner-overlay'>
        <div className='spinner-container'/>
    </div>
);

export default React.memo(Spinner);