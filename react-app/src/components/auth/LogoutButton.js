import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import classes from "../NavBar.module.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className={classes.links}>Logout</button>;
};

export default LogoutButton;
