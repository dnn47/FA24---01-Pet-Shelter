import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentUser }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'User', path: '/user' },
    { name: 'Animals', path: '/animals' },
    { name: 'Applications', path: '/applications' },
  ];

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {navItems.map((item) => (
          <li
            key={item.name}
            style={{
              ...styles.navItem,
              ...(location.pathname === item.path && styles.activeNavItem),
            }}
          >
            <Link to={item.path} style={styles.navLink}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '1rem',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    justifyContent: 'space-around',
  },
  navItem: {
    marginRight: '1.5rem',
  },
  activeNavItem: {
    textDecoration: 'underline',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};

export default Navbar;
