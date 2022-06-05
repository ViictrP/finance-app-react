import React from 'react';
import { useCookies } from 'react-cookie';
import { Button } from 'antd';

const AuthenticatedPage = () => {
  const [, , removeCookie] = useCookies(['authenticated']);

  return (
    <div>
      <h1>You're authenticated!</h1>
      <Button
        style={{ padding: 4 }}
        type='link'
        href='/credit-cards'
      >
        Cartões
      </Button>
      <Button
        style={{ padding: 4 }}
        type='link'
        href='/'
      >
        Home
      </Button>

    </div>
  );
};

export default AuthenticatedPage;

