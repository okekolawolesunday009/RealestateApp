import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'

export default function Profile() {
  const auth = getAuth;
  const [form, setForm] = useState(
    
    {
      name:auth.currentUser.displayName,
      email:auth.currentUser.email
    })
    const {name, email} = form
  return (
    <section className='max-w-6xl mx-auto flex justify-center flex-col'>
        <h1 className='text-3xl mt-6 font-bold text-center'>Profile </h1>
    <form action="" className='w-full md:w[50%] mt-6 px-3 flex gap-4 flex-col'>
         <input
                     className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                     value={name}
                    //  onChange={handleChange}
                     type="name"
                    //  placeholder='' 
                     name="name" id="name" />
          <input
                     className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                     value={email}
                    //  onChange={handleChange}
                     type="email"
                     placeholder='Email' 
                     name="email" id="email" />

          <div className="flex justify-between whitespace-nowrap md:text-sm sm:text-lg">
          <div>Do you want to change your name <span className='text-red-600 ml-1 hover:text-red-700 cursor-pointer transition ease-in-out duration-200'>edit</span></div>
          <div className='text-blue-600 ml-1 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200'>Sign out</div>
          </div>
      </form>
    
     </section>
  )
}
