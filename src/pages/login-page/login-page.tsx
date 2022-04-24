import './style.css';
import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from '../../components/ui/login-form/login-form';

const LoginPage = () => {
  return (
    <Row>
      <Col span={24}></Col>
      <Col span={24}>
        <div className="container">
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
