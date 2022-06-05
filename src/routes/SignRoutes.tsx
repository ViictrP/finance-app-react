import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/login-page/login-page';

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
