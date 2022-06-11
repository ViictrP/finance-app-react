import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  title?: any;
  href?: string;
  onClick?: () => void;
}

export const NavigationItem = ({ href, title, onClick }: NavigationItemProps) => {
  return (
    <Link
      className='navigation-item-container'
      onClick={() => {onClick && onClick()}}
      to={href ?? ''}>
      {title ?? 'item'}
    </Link>
  );
};

const NavigationBar = ({ children }: any) => {
  return (
    <div className='navigation-bar-container'>
      {children}
    </div>
  );
};

export default NavigationBar;
