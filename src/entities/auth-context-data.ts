import AccessToken from 'entities/access-token';
import User from 'entities/user';

export default interface AuthContextData {
  signed: boolean;
  authenticate(user: User): Promise<AccessToken>;
  logout: () => void;
};
