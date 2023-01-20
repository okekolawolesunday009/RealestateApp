import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import SignIn from '../Pages/SignIn';
import '../css/spinner.css'

export default function PrivateRoute() {

    const {loggedIn, checkingStatus} = useAuthStatus()
    if(checkingStatus){
        return <div className='lds-facebook spinner'><div></div><div></div><div></div></div>;
    }

//    const [loggedIn, setLoggedIn] =useState(false)
  return loggedIn ? <Outlet/> :<Navigate to= "/sign-in/"/>
}
