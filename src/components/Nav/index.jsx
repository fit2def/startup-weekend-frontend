import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logout from '../Logout';
import './Nav.css';

function Nav({ history, logout }) {

  const path = history.location.pathname;

  return (
    <nav>
        <ul>
          <li>
            <NavLink
              to='/'
              className={path === '/'  ? 'active-link' : 'non-active-link'} >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/businesses'
              className={path === '/'  ? 'active-link' : 'non-active-link'} >
              FIND BUSINESSES
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/leaderboard"
              className={path === '/'  ? 'active-link' : 'non-active-link'}>
              LEADERBOARD
            </NavLink>
          </li>

        <li>
        <Logout/>
        </li>  

        </ul>

    </nav>
  );
}

export default withRouter(Nav);