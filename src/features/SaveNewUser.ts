import { UserProfile } from '../entities';
import { api } from '../lib/api';

const saveNewUser = async (user: UserProfile) => {
  return api.post<UserProfile>('/users', user);
};

export default saveNewUser;
