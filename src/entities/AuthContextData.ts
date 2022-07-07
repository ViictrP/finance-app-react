import AccessToken from './AccessToken';
import AuthUser from './AuthUser';

export default interface AuthContextData {
  signed: boolean;
  logout: () => void;

  authenticate(user: AuthUser): Promise<AccessToken>;
};
