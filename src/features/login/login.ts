import axios from 'axios';
import { AccessToken, User } from 'entities';
import { API_CONFIG } from 'config/api-config';
const URL = API_CONFIG.API_URL;
const LOGIN_PATH = API_CONFIG.PATHS.LOGIN;

const login = async (user: User) => {
  return axios.post<AccessToken>(`${URL}${LOGIN_PATH}`, user);
};

export default login;
