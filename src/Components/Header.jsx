import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import '../styles/header.css'
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
  const [navPanel, setNavPanel] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState("Profile")
      } else {
        setPageState("sign-in")
      }
    
    })
  }, [auth])
  

  function pathMatchRoute(route){
    if (route === location.pathname){
      return true
    }
  }
    const [showNavx, setShowNavx]= useState(true);
    const [navBarshow, setNavBarShow] = useState(true)


    function navbar(){
      console.log("clicked");
      setNavBarShow((p) => !p);
      setShowNavx((prevState) => !prevState);
      setNavPanel(true);
    //   setTimeout(() => {
    //     setNavPanel(false);
    //     setShowNavx((prevState) => !prevState);
    // },2500);
    //   navigate('/')
    }
    const [activeItem, setActiveItem] = useState(1);

    const handleItemClick = (index) => {
      setActiveItem(index);
    };

  return (
    <div className=' bg-white border-b shadow-sm  all w-full' >
        <header className='flex justify-between px-3 py-5 items-center max-w-6xl mx-auto sticky top-0'>
            <div className=""
              onClick={()=> navigate("/")}>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                className='logo cursor-pointer'
                alt='logo'/>

            </div>
            {
           showNavx ?
            (<GoThreeBars  className={`threebar`} onClick={navbar}/>)
            :
            (<MdCancel  className={`threebar`} onClick={navbar}/>)
           }

           

          

            <div className='Nav' >
              <div className='nav_one'>
              <ul className={`flex lg:space-x-10 md:space-x-10 ${navBarshow ? 'option' : 'options__open'} `}>
    <div className='show-active' onClick={()=> navigate("/")}>

     <li className={` text-lg font-bold cursor-pointer `}>Home</li>
</div>
 <div className='show-active' onClick={()=> navigate("/offers")}>

       <li className={` text-lg font-bold cursor-pointer `}>offers</li>
 </div>
    
 <div className='show-active' onClick={()=> navigate("/profile")}>
     {/* <Nav className={`${pathMatchRoute("/sign-in") || pathMatchRoute("/profile")}`}
       title='SignIn'/> */}
       <li className={` text-lg font-bold cursor-pointer 
       ${(pathMatchRoute("/sign-in")  || pathMatchRoute("/profile")) 
       && " border-b-red-500"}`}>{pageState}</li>

 </div>
    



</ul>

              </div>
              <div className='nav_two'>
              <nav className={`text-black ${navBarshow ? 'option' : 'options__open'}`}>
      
           <ul>
      <div className=" flex space-x-2">
        {/* Menu items */}
        <div
          onClick={() => {
            navigate("/");
            handleItemClick(1);
          } }
          className={`show-active text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium ${activeItem == 1 ? 'hidden' : ''}`}
        >
                 <li className={` text-lg font-bold cursor-pointer `}>Home</li>

        </div>
        <div
          onClick={() => {
            navigate("/offers");
            handleItemClick(2);
          }}
          className={`text-black show-active hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium ${activeItem == 2 ? 'hidden' : ''}`}
        >
                 <li className={` text-lg font-bold cursor-pointer `}>offers</li>

        </div>
        <div
          onClick={() =>  {
            navigate("/profile");
            handleItemClick(3);
          }}
          className={`text-black show-active hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium ${activeItem == 3 ? 'hidden' : ''}`}
        >
                        <li className={` text-lg font-bold cursor-pointer 
            ${(pathMatchRoute("/sign-in")  || pathMatchRoute("/profile")) 
            && " border-b-red-500"}`}>{pageState}</li>
        </div>
      </div>
      </ul>
    
</nav>
  
              </div>
           
            </div>
          
        </header>
    </div>
  )
}
