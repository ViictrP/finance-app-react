import { SignOut, UserCircle } from 'phosphor-react';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';

const Header = () => {
  const { logout } = useAuth();
  const userStored = useSelector(selectUser);

  return (
    <>
      <div id="home-header" className="flex flex-row items-center justify-between mb-8">
        <div className="flex flex-row items-center">
          <UserCircle size={32} weight="fill" />&nbsp;
          {/* TODO adicionar skeleton */}
          <b className="text-3xl">{userStored.isLoadingProfile ? 'loading...' : userStored.profile?.name}</b>
        </div>
        <button onClick={logout}>
          <SignOut size={26} weight="bold" />
        </button>
      </div>
    </>
  );
};

export default Header;
