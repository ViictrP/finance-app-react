import AccessToken from './AccessToken'
import User from './User'

export default interface AuthContextData {
  signed: boolean;
  user?: User;
  logout: () => void;

  authenticate(user: User): Promise<AccessToken>;
};
