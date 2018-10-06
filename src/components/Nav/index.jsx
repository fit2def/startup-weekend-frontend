import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logout from '../Logout';
import './Nav.css';

function Nav({ history }) {

  const path = history.location.pathname;

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to='/'
            className={path === '/' ? 'active-link' : 'non-active-link'} >
            Find Businesses
            </NavLink>
        </li>

        <li>
          <NavLink
            to='/leaderboard'
            className={path === '/leaderboard' ? 'active-link' : 'non-active-link'} >
            Leaderboard
            </NavLink>
        </li>

        <li>
          <Logout />
        </li>

      </ul>

    </nav>
  );
}

export default withRouter(Nav);