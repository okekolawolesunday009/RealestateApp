import { getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const auth = getAuth();
  const [changeProfileName, setChangeProfileName] = useState(false);
  
  function handleChange(){
    setChangeProfileName((prevState) => !prevState)
    console.log("clicked")
  }
  function handleChangeName(e){
    e.preventDefault();
    setForm((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
  }))
   

  }
  const navigate = useNavigate()
  const [form, setForm] = useState(
  
    
    {
      name:auth.currentUser.displayName,
      email:auth.currentUser.email
    })

    const {name, email} = form
    function onLogout (){
      auth.signOut()
      navigate('/')
    }
  return (
    <section className='max-w-6xl mx-auto flex justify-center flex-col'>
        <h1 className='text-3xl mt-6 font-bold text-center'>Profile </h1>
    <form action="" className='w-full md:w[50%] mt-6 px-3 flex gap-4 flex-col'>
          <input
                     className={`text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out ${changeProfileName && "bg-red-200"}`}
                     value={name}
                     disabled ={!changeProfileName}
                     onChange={handleChangeName}
                     type="text"
                    //  placeholder='Full name' 
                     name="name" id="name" />
          <input
                     className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                     value={email}
                    //  onChange={handleChange}
                     type="email"
                    //  placeholder='Email' 
                     name="email" id="email" />

          <div className="flex justify-between whitespace-no-wrap ">
          <div className='md:text-sm sm:text-lg lg:text-lg'>Do you want to change your name <span className='text-red-600 ml-1 hover:text-red-700 cursor-pointer transition ease-in-out duration-200' 
           onClick={handleChange}>
          {changeProfileName ? "edit" : "Apply changes"}
          </span>
          </div>
          <div className='text-blue-600 ml-1 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200 md:text-sm sm:text-lg lg:text-lg' onClick={onLogout}>Sign out</div>
          </div>
      </form>
    
     </section>
  )
}
