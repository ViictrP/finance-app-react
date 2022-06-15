import LoginForm from '../../components/LoginForm'
import { useAuth } from '../../context/auth/AuthContext'
import { User } from '../../entities'

const LoginPage = () => {
  const { authenticate } = useAuth()

  const onSubmit = async (user: User) => {
    return authenticate(user)
  }

  return (
    <div className="h-full p-4 mt-14">
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

export default LoginPage
