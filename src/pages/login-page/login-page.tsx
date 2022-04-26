import './style.css';
import React from 'react';
import { Col, Row } from 'antd';
import { LoginForm } from 'components';
import { login } from 'features';
import { User } from 'entities';

const LoginPage = () => {

  async function loginIn(user: User) {
    console.log(`Authenticating user ${user.username}`);
    const accessToken = await login(user);
    console.log('User authenticated', accessToken.data);
  }

  return (
    <Row className='full-height' align='middle'>
      <Col xs={24} sm={24} md={4} lg={4} className='login-image' />
      <Col xs={24} sm={24} md={10} lg={8}>
        <div className='container'>
          <LoginForm
            onForgotUsernameClick={() => console.log('forgot my username')}
            onForgotPasswordClick={() => console.log('forgot my password')}
            onFirstAccessClick={() => console.log('my first access')}
            onSubmit={loginIn}
          />
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
