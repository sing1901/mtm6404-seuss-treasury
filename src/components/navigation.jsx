import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import the CSS for styling

function Navigation() {
  return (
    <nav className="main-nav">
      {/* Use Link component for SPA navigation */}
      <Link to="/">Books</Link>
      <Link to="/quotes">Quotes</Link>
    </nav>
  );
}

export default Navigation;