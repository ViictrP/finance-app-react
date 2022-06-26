import { Loading, LoginForm, Snackbar } from '../components';
import { useAuth } from '../context/AuthContext';
import { AuthUser } from '../entities';
import { useState } from 'react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { authenticate } = useAuth();

  const onSubmit = async (user: AuthUser) => {
    try {
      setError(false);
      setLoading(true);
      await authenticate(user);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-4 mt-14">
      {!loading && <LoginForm onSubmit={onSubmit} />}
      {loading && <Loading showText={true} size={24} text="carregando dados..." fullscreen={true} />}
      <Snackbar message="Credenciais inválidas..." autoClose={true} showClose={true} show={error} />
    </div>
  );
};

export default LoginPage;
