import './style.css';

import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

type LoginFormProps = {
  onForgotUsernameClick: () => void;
  onForgotPasswordClick: () => void;
  onFirstAccessClick: () => void;
  onSubmit: (data: Data) => void;
};

type Data = {
  username: string;
  password: string;
  remember: boolean;
};

const LoginForm = (props: LoginFormProps) => {
  const [form] = Form.useForm();
  
  function onFinish(values: any) {
    props.onSubmit(values);
  }

  return (
    <div>
      <Title level={3}>Acessar o sistema</Title>
      <Text>
        Ao continuar você concorda com os termos e condições do sistema.
      </Text>
      <div className="divider-2x"></div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"  
        onFinish={onFinish}
      >
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
          <Text>
            Esqueceu o
            <Button
              style={{ padding: 4 }}
              type="link"
              onClick={props.onForgotUsernameClick}
            >
              usuário
            </Button>
            ou
            <Button
              style={{ padding: 4 }}
              type="link"
              onClick={props.onForgotPasswordClick}
            >
              senha.
            </Button>
          </Text>
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
          <Text>
            Primeiro acessso
            <Button
              style={{ padding: 4 }}
              type="link"
              onClick={props.onFirstAccessClick}
            >
              clique aqui.
            </Button>
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
