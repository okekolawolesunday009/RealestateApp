import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import Nav from '../Pages/Nav';



export default function Header(selected) {

    

  return (
    <div className=' bg-white border-b shadow-sm'>
        <header className='flex justify-between px-3 py-5 items-center max-w-6xl mx-auto sticky top-0'>
            <div className="">
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                className='h-7 cursor-pointer'
                alt='logo'/>
            </div>

            <div className='Nav' >
                <ul className='flex space-x-10'>
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
