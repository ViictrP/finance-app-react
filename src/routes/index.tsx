import { useAuth } from '../context/AuthContext'
import AuthenticatedRoutes from './AuthenticatedRoutes'
import SignRoutes from './SignRoutes'

const Routes = () => {
  const { signed } = useAuth()
  return signed ? <AuthenticatedRoutes /> : <SignRoutes />
}

export default Routes
