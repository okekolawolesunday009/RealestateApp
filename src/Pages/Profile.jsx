import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {doc } from 'firebase/firestore';
import {db} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { toast } from 'react-toastify';
import { FcHome } from 'react-icons/fc';

export default function Profile() {
 
  const [changeProfileName, setChangeProfileName] = useState(false);
  const auth = getAuth();
  async function submit(){
    try {
      if(auth.currentUser.displayName !== name){
           
            const userCredential = await createUserWithEmailAndPassword(auth);
           await  updateProfile(auth.currentUser, {
            displayName: name
        });
    //  const user = userCredential.user;
    const docRef = doc(db, 'users', auth.currentUser.uid)
      await updateProfile(docRef, {
        name 
      })
    toast.success('profile details updated')
     }

    } catch (error) {
      toast.error("Could not update profile")
      
    }
   
  
  }
  
  function handleChange(){
    setChangeProfileName((prevState) => !prevState)
    console.log("clicked")
    changeProfileName && submit()
  }
  function handleChangeName(e){
    e.preventDefault();
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
  }))
   

  }
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
      name:auth.currentUser.displayName,
      email:auth.currentUser.email
    })

    const {name, email} = formData;
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
          {changeProfileName ? "Apply changes" : "edit"}
          </span>
          </div>
          <div className='text-blue-600 ml-1 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200 md:text-sm sm:text-lg lg:text-lg' onClick={onLogout}>Sign out</div>
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800 hover: shadow-lg'>
             <Link to={'/create-listing'} className="flex justify-center items-center">
                <FcHome className='mr-2 text-2xl bg-red-200 rounded-full p-1 border-2'/>
                Sell or rent your home
             </Link>
           
          </button>
      </form>
    
     </section>
  )
}
