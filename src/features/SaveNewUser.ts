import { User } from '../entities';
import { api } from '../lib/api';

const saveNewUser = async (user: User) => {
  return api.post<User>('/users', user);
};

export default saveNewUser;
