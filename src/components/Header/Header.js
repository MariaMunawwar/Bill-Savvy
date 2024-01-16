import React from 'react';
import { BsJustify } from 'react-icons/bs';

function Header({ onSidebarToggle }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={onSidebarToggle} />
      </div>
    </header>
  );
}

export default Header;
