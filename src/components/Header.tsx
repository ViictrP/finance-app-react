import { SignOut, UserCircle } from 'phosphor-react'
import { useAuth } from '../context/auth/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <>
      <div id="home-header" className="flex flex-row items-center justify-between mb-8">
        <div className="flex flex-row items-center">
          <UserCircle size={32} weight="fill" />&nbsp;
          <b className="text-2xl">{user?.username}</b>
        </div>
        <button onClick={logout}>
          <SignOut size={20} weight="bold" />
        </button>
      </div>
    </>
  )
}

export default Header
