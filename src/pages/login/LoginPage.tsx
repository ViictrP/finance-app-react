import LoginForm from '../../components/login/LoginForm'
import { useAuth } from '../../context/auth/AuthContext'

const LoginPage = () => {
  const { authenticate } = useAuth()

  return (
    <div>
      <LoginForm />
      <button onClick={() => authenticate({ username: '', password: '' })}>
        LOGAR
      </button>
    </div>
  )
}

export default LoginPage
