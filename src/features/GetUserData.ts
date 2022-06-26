import { api } from '../lib/api';
import { User } from '../entities';
import axios from 'axios';

const getUserData = async () => {
  return api.get<User>('/me', {
    headers: axios.defaults.headers.common
  });
};

export default getUserData;