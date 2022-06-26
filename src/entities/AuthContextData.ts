import AccessToken from './AccessToken';
import AuthUser from './AuthUser';
import User from './User';

export default interface AuthContextData {
  signed: boolean;
  user?: User;
  logout: () => void;

  authenticate(user: AuthUser): Promise<AccessToken>;
};
