import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Logout from '../Logout';
import './Nav.css';

function Nav({ history, logout }) {

  const path = history.location.pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item">
            <NavLink
              to='/'
              className={path === '/'  ? 'active-link' : 'non-active-link'} >
              HOME
            </NavLink>
          </li>

        </ul>
        <Logout logout={logout}/>
      </div>
    </nav>
  );
}

export default withRouter(Nav);