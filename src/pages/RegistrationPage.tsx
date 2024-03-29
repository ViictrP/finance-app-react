import RegisterForm from '../components/RegisterForm';
import { UserProfile } from '../entities';
import { useState } from 'react';
import { Loading, Snackbar } from '../components';
import { saveNewUser } from '../features';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const RegistrationPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const onSubmit = async (user: UserProfile) => {
    try {
      setError(false);
      setLoading(true);
      setLoadingMessage('salvando novo usuário...');
      await saveNewUser(user);
      setLoadingMessage('autenticando...');
      await authenticate({ email: user.email, password: user.password });
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-4 mt-14">
      <button className="pulse-single" onClick={() => navigate(-1)}>
        <ArrowLeft size={26} className="text-zinc-900 dark:text-white"/>
      </button>
      {!loading && <RegisterForm onSubmit={onSubmit} />}
      {loading && <Loading showText={true} size={24} text={loadingMessage} fullscreen={true} />}
      <Snackbar message="Credenciais inválidas..." autoClose={true} showClose={true} show={error} />
    </div>
  );
};

export default RegistrationPage;
