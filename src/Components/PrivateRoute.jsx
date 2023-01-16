import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import SignIn from '../Pages/SignIn';

export default function PrivateRoute() {
    const loggedIn = false;
  return loggedIn ? 
  <Outlet/> :<Navigate to= "/sign-in/"/>
}
