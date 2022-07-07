import axios from 'axios';
import { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { login } from '../features';
import { AccessToken, AuthContextData, AuthUser } from '../entities';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// @ts-ignore
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const authenticate = async (user: AuthUser): Promise<AccessToken> => {
    const { data } = await login(user);
    axios.defaults.headers.common['x-authentication-token'] = `${data.accessToken}`;
    setCookie('accessToken', data.accessToken);
    return { accessToken: data.accessToken };
  };

  const logout = () => {
    removeCookie('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(cookies.accessToken), authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
