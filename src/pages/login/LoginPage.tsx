import LoginForm from '../../components/login/LoginForm'
import { useAuth } from '../../context/auth/AuthContext'
import { User } from '../../entities'

const LoginPage = () => {
  const { authenticate } = useAuth()

  const onSubmit = (user: User) => {
    authenticate(user)
  }

  return (
    <div className="h-full p-8 mt-14">
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

export default LoginPage
