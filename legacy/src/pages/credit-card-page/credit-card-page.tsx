import React from 'react';
import './style.css';
import { CreditCardForm } from 'components';

const CreditCardPage = () => {
    return (
        <div className='container'>
            <h1>Credit cards</h1>
            <CreditCardForm />
        </div>
    )
};

export default CreditCardPage;
