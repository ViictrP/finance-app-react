import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { login, getUserData } from '../features';
import { AccessToken, AuthContextData, AuthUser, User } from '../entities';

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
