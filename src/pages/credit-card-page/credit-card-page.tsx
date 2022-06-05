import React from 'react';
import './style.css';
import { CreditCardForm } from 'components';
import { Button } from 'antd';

const CreditCardPage = () => {
    return (
        <div>
            <h1>Credit cards</h1>
            <CreditCardForm />
        </div>
    )
};

export default CreditCardPage;
