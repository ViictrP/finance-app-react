import { AccessToken, AuthUser } from '../../entities';
import { api } from '../../lib/api';

const login = async (user: AuthUser) => {
  return api.post<AccessToken>('/login', user);
};

export default login;
