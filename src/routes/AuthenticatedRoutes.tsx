import { CreditCard, HouseSimple } from 'phosphor-react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar, { NavigationItem } from '../components/navigation-bar/NavigationBar'
import { useAuth } from '../context/auth/AuthContext'

import CreditCardPage from '../pages/credit-card/CreditCardPage'
import HomePage from '../pages/home/HomePage'

const AuthenticatedRoutes: React.FC = () => {
  const { logout } = useAuth()

  return (
    <BrowserRouter>
      <NavigationBar>
        <NavigationItem
          href="/"
          title={<HouseSimple weight="bold" className="w-6 h-6" />}
        />
        <NavigationItem
          href="/credit-cards"
          title={<CreditCard weight="bold" className="w-6 h-6" />}
        />
      </NavigationBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/credit-cards" element={<CreditCardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AuthenticatedRoutes
