import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Book Nook</Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/reading-list" className="nav-link">Reading List</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
