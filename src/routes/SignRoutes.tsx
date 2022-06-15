import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/login/LoginPage'

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default SignRoutes
