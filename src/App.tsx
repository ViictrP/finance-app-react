import { useAuth } from './context/AuthContext';
import Routes from './routes';
import { useSelector } from 'react-redux';
import { selectUser, userApiActions } from './store/slices/userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hook';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const App = () => {
  const [cookies] = useCookies(['accessToken']);
  const userStored = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const { signed } = useAuth();

  useEffect(() => {
    if (signed && !userStored.isLoadingProfile && cookies.accessToken) {
      console.log('signed !');
      axios.defaults.headers.common['x-authentication-token'] = `${cookies.accessToken}`;
      dispatch(userApiActions.getUserProfileThunk());
    }
  }, [signed]);

  useEffect(() => {
    if (userStored.saveTransactionSuccess || userStored.saveCreditCardSuccess) {
      dispatch(userApiActions.getUserProfileThunk());
    }
  }, [userStored.saveTransactionSuccess, userStored.saveCreditCardSuccess]);

  return (
    <Routes />
  );
};

export default App;
