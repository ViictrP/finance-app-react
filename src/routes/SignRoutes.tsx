import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
