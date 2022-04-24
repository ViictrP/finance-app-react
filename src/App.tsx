import './App.css';
import React, { FC } from 'react';
import LoginPage from './pages/login-page/login-page';

const App: FC = () => {
  return (
    <div className="App">
      <LoginPage data-testid="login-page"/>
    </div>
  );
};

export default App;
