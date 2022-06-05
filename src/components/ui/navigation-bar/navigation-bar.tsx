import React from 'react';
import './style.css';

interface NavigationItemProps {
  title?: any;
  onClick: () => void;
}


//TODO: fix items hidden behind navigation bar
export const NavigationItem = ({ onClick, title }: NavigationItemProps) => {
  return (
    <div
      className='navigation-item-container'
      onClick={onClick}>{title ? title : 'item'}
    </div>
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
