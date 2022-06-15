import { API_CONFIG } from '../../config/ApiConfig'
import { AccessToken, User } from '../../entities'

const URL = API_CONFIG.API_URL
const LOGIN_PATH = API_CONFIG.PATHS.LOGIN

const login = async (user: User) => {
  // return axios.post<AccessToken>(`${URL}${LOGIN_PATH}`, user);
  return new Promise<AccessToken>(resolve => {
    resolve({ accessToken: 'UHASDUIG' })
  })
}

export default login
