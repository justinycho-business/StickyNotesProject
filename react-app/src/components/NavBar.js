
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import classes from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={classes.navbar}>

        <div>
          <NavLink to='/' exact={true} activeClassName='active' className={classes.links}>
            Boards
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active' className={classes.links}>
            Login
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div> */}
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div>
          <LogoutButton />
        </div>

    </nav>
  );
}

export default NavBar;
