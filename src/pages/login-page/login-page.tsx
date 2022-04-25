import './style.css';
import React from 'react';
import { Col, Row } from 'antd';
import LoginForm from '../../components/ui/login-form/login-form';

const LoginPage = () => {
  return (
    <Row className='full-height' align='middle'>
      <Col xs={24} sm={24} md={4} lg={4} className='login-image' />
      <Col xs={24} sm={24} md={10} lg={8}>
        <div className='container'>
          <LoginForm
            onForgotUsernameClick={() => console.log('forgot my username')}
            onForgotPasswordClick={() => console.log('forgot my password')}
            onFirstAccessClick={() => console.log('my first access')}
            onSubmit={(values) => console.log(values)}
          />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
