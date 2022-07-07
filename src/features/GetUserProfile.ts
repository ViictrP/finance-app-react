import { api } from '../lib/api';
import { UserProfile } from '../entities';
import axios from 'axios';

const getUserProfile = async () => {
  return api.get<UserProfile>('/me', {
    headers: axios.defaults.headers.common
  });
};

export default getUserProfile;
