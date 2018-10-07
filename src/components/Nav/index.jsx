import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logout from '../Logout';
import './Nav.css';

function Nav({ history }) {

  const path = history.location.pathname;

  return (
    <nav className="navbar fixed-bottom navbar-light bg-light border-top">
          <NavLink
            to='/'
            className={path === '/' ? 'nav-link active-link ' : 'nav-link non-active-link'} >
          
            <i className="fas fa-briefcase"></i>
            Businesses
            </NavLink>
          <NavLink
            to='/leaderboard'
            className={path === '/leaderboard' ? 'nav-link active-link border-left border-right' : 'nav-link non-active-link border-left border-right'} >
           <i className="fas fa-trophy"></i>
           Leader
            </NavLink>
          <Logout />

    </nav>
  );
}

export default withRouter(Nav);