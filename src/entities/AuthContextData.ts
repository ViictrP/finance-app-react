import AccessToken from "./AccessToken";
import User from "./User";

export default interface AuthContextData {
  signed: boolean;
  authenticate(user: User): Promise<AccessToken>;
  logout: () => void;
};