import AccessToken from './AccessToken';
import User from './User';

export default interface AuthContextData {
  signed: boolean;
  user?: User;
  authenticate(user: User): Promise<AccessToken>;
  logout: () => void;
};