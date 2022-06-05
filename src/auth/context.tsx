import React, { createContext, useContext, useEffect, useState } from 'react';
import { login } from 'features';
import { AccessToken, AuthContextData, User } from 'entities';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const authenticate = async (user: User): Promise<AccessToken> => {
    const accessToken = await login(user);
    setCookie('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return accessToken;
  };

  const logout = () => {
    removeCookie('accessToken');
  };

  return (
    <AuthContext.Provider value={{ signed: Boolean(cookies.accessToken), authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
