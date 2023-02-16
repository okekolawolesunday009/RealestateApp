import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import Nav from '../Pages/Nav';
import '../css/header.css';
import {GoThreeBars} from 'react-icons/go'
import {MdCancel} from 'react-icons/md'
import { getAuth, onAuthStateChanged } from 'firebase/auth';



export default function Header(selected) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageState, setPageState]= useState('Sign-in')
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState("Profile")
      }
    
    })
  }, [auth])
  

  function pathMathRoute(route){
    if (route === location.pathname){
      return true
    }
  }
    const [showNavx, setShowNavx]= useState(true);
    const [navBarshow, setNavBarShow] = useState(true)


    function navbar(){
      console.log("clicked");
      setNavBarShow((p) => !p);
      setShowNavx((prevState) => !prevState)
    //   navigate('/')
    }

  return (
    <div className=' bg-white border-b shadow-sm  all w-full'>
        <header className='flex justify-between px-3 py-5 items-center max-w-6xl mx-auto sticky top-0'>
            <div className="bg-black">
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
                    <div onClick={()=> navigate("/profile")}>
                        {/* <Nav className={`${pathMathRoute("/sign-in") || pathMathRoute("/profile")}`}
                          title='SignIn'/> */}
                          <li className={` text-lg font-bold cursor-pointer ${pathMathRoute("/sign-in")  || pathMathRoute("/profile") && " border-b-red-500"}`}>{pageState}</li>

                    </div>
                       
               
                   
                   
                </ul>
            </div>
        </header>
    </div>
  )
}
