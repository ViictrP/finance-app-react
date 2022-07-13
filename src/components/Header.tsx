import { ArrowLeft, Gear, SignOut, UserCircle } from 'phosphor-react';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../helpers/currencyFormatter';
import { useCallback } from 'react';

interface HeaderProp {
  showBackButton?: boolean;
}

const Header = ({ showBackButton }: HeaderProp) => {
  const { logout } = useAuth();
  const storedUser = useSelector(selectUser);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const logoutClickHandler = useCallback(() => {
    logout();
    navigate('/')
  }, [logout]);

  return (
    <>
      <div id="home-header" className="flex flex-row items-center justify-between mb-8">
        <div className="flex flex-row items-center gap-5">
          {
            showBackButton &&
            <button className="pulse-single" onClick={goBack}>
              <ArrowLeft size={26} />
            </button>
          }
          <div className="flex flex-row items-center">
            <UserCircle size={32} weight="fill" />&nbsp;
            {/* TODO adicionar skeleton */}
            <b className="text-3xl">{storedUser.isLoadingProfile ? 'loading...' : storedUser.profile?.name}</b>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button title="gear" type="button" className="pulse-single" onClick={() => navigate('/balance')}>
            <Gear size={26} weight="fill" />
          </button>
          <button className="pulse-single" onClick={logoutClickHandler}>
            <SignOut size={26} weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
