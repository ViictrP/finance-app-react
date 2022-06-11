import './App.css';
import React, { FC } from 'react';
import Routes from 'routes';
import { AuthProvider } from 'auth/context';

const App: FC = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
};

export default App;
