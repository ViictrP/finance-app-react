import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { AccessToken, AuthContextData, User } from '../../entities'
import login from '../../features/login/Login'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const [user, setUser] = useState<User>()

  const authenticate = async (user: User): Promise<AccessToken> => {
    const accessToken = await login(user)
    setCookie('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    setUser(user)
    return accessToken
  }

  const logout = () => {
    removeCookie('accessToken')
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(cookies.accessToken), user, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
