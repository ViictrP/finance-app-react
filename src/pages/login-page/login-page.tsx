import './style.css';
import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from '../../components/ui/login-form/login-form';

const LoginPage = () => {
  return (
    <Row>
      <Col span={24}>
        <div className='container'>
          <LoginForm />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
