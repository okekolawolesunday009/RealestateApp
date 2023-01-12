import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import Nav from '../Pages/Nav';
import '../css/header.css';
import {GoThreeBars} from 'react-icons/go'
import {MdCancel} from 'react-icons/md'



export default function Header(selected) {
    const [showNavx, setShowNavx]= useState(true);
    const navigate = useNavigate()
    const [navBarshow, setNavBarShow] = useState(true)


    function navbar(){
      console.log("clicked");
      setNavBarShow((p) => !p);
      setShowNavx((prevState) => !prevState)
    //   navigate('/')
    }

  return (
    <div className=' bg-white border-b shadow-sm container all'>
        <header className='flex justify-between px-3 py-5 items-center max-w-6xl mx-auto sticky top-0'>
            <div className="bg-lack">
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                className='logo cursor-pointer'
                alt='logo'/>

            </div>
            {
           showNavx ?
            (<GoThreeBars className={`threebar`} onClick={navbar}/>)
            :
            (<MdCancel  className={`threebar`} onClick={navbar}/>)
           }

            <div className='Nav' >
          
                <ul className={`flex lg:space-x-10 md:space-x-10 ${navBarshow ? 'option' : 'options__open'} `}>
                    <Link to={'/'}>
                       <Nav selected title='Home' />

                    </Link>
                    <Link to={'/offers'}>
                       <Nav  title='Offers' />
                    </Link>
                    <Link to={'/sign-in'}>
                       <Nav  title='SignIn'/>
                    </Link>
                   
                </ul>
            </div>
        </header>
    </div>
  )
}
