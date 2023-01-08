import React from 'react';
import {FcGoogle} from 'react-icons/fc'


export default function OAUTH() {
  return (
    <div className='font-semibold flex justify-center items-center gap-2 w-full h-11 rounded-md shadow-md   text-white text-sm  bg-red-600 hover:bg-red-700 transition duration-100 active:bg-red-800'>
        <FcGoogle className=''/>
        <button  className='text-1xl' >Continue with Google</button>
                       
      </div>
  )
}
