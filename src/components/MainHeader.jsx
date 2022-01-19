import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { Icon, ToggleButton } from '@mui/material';
import { Audiotrack, Home, Menu } from '@mui/icons-material';

export function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const onLogOut = () => {
    userService.logout();
  };

  const toggleNavBar = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <header className="app-header">
      <div className="logo bounce">
        <span className="letter">L</span>
        <span className="letter">O</span>
        <span className="letter">O</span>
        <span className="letter">P</span>
        <span className="letter">M</span>
        <span className="letter">A</span>
        <span className="letter">C</span>
        <span className="letter">H</span>
        <span className="letter">I</span>
        <span className="letter">N</span>
        <span className="letter">E</span>
      </div>

      <ToggleButton onClick={toggleNavBar} value="menu" aria-label="menu">
        <Menu />
      </ToggleButton>

      <div
        onClick={toggleNavBar}
        className={isOpen ? 'screen' : 'invisible'}
      ></div>

      <nav className={isOpen ? 'nav-bar open' : 'nav-bar'}>
        <Link to="/">
          <Button variant="text">
            Home <Home />
          </Button>
        </Link>
        <Link to="/audio">
          <Button variant="text">
            Looper <Audiotrack />
          </Button>
        </Link>
      </nav>
    </header>
  );
}
