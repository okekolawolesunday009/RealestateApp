import React from 'react';
import '../index.css';



export default function Header() {
  return (
    <div className=' bg-white border-b shadow-sm'>
        <header className='flex justify-between px-3 py-5 items-center max-w-6xl mx-auto sticky top-0'>
            <div className="">
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                className='h-7 cursor-pointer'
                alt='logo'/>
            </div>

            <div>
                <ul className='flex space-x-10'>
                    <li className='text-lg font-bold'>Home</li>
                    <li className='text-lg font-bold'>Offers</li>
                    <li className='text-lg font-bold'>SignIn</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
