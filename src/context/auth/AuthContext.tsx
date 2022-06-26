import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { AccessToken, AuthContextData, AuthUser } from '../../entities';
import login from '../../features/login/Login';
import getUserData from '../../features/user/GetUserData';
import User from '../../entities/User';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'name', 'lastname']);
  const [user, setUser] = useState<User>();

  const authenticate = async (user: AuthUser): Promise<AccessToken> => {
    const { data } = await login(user);
    axios.defaults.headers.common['x-authentication-token'] = `${data.accessToken}`;
    const { data: userData } = await getUserData();
    setCookie('accessToken', data.accessToken);
    setCookie('name', userData.name);
    setUser(userData);
    return { accessToken: data.accessToken };
  };

  const logout = () => {
    removeCookie('accessToken');
  };

  useEffect(() => setUser({ name: cookies.name } as any), [cookies]);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(cookies.accessToken), user, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
