import './style.css';

import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const LoginForm = () => {
  return (
    <div>
      <Title level={3}>Acessar o sistema</Title>
      <Text>
        Ao continuar você concorda com os termos e condições do sistema.
      </Text>
      <div className="divider-2x"></div>
      <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Text>Esqueceu o usuário ou senha</Text>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            size="large"
            block
          >
            Acessar
          </Button>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Text>Primeiro acessso</Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
