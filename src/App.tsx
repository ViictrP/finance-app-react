import { AuthProvider } from "./context/auth/AuthContext"
import Routes from "./routes"

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
