import { AuthProvider } from './context/AuthContext'
import Routes from './routes'

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
