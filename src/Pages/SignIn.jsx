import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import OAUTH from '../Components/OAUTH';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {db} from '../firebase'

export default function SignIn() {
    const [showPassword, setShowPassword]= useState(false);
    const [formData , setFormData ] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const {email, password} = formData;
    function handleChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }
    async function handleSubmit (e){
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword (auth,email, password)
           if(userCredential.user){
              navigate("/profile")
           }
                
        } catch (error) {
            toast.error('Bad Creditation')
        }
    }

  return (
    <section>
        <h1 className='text-4xl text-center mt-6 font-bold'>Sign In</h1>
        <div className='flex justify-center flex-wrap gap-5 items-center px-6 py-12 max-6xl'>
           <div className='lg:w-[40%] md-12 md: md-6 ' >
                <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="key" 
                className='w-full rounded-2xl'/>
            </div>
            <div className=' w-full md:mt-20 md:w-[67%] lg:w-[40%] lg:ml-20 '>
                <form action="" onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                    {/* <label htmlFor="" className='font-bold'>Email</label> */}
                    <input
                     className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                     value={email}
                     onChange={handleChange}
                     type="email"
                     placeholder='Email' 
                     name="email" id="email" />
                    </div>
                    <div className='relative'>
                        {/* <label htmlFor="" className='font-bold'>Password</label> */}

                        <input 
                        className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                        value={password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password" }
                        placeholder='Password'
                        name="password" id="password" />

                        {showPassword ?
                         (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer'
                          onClick={()=> setShowPassword((prevState) =>!prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'
                          onClick={()=> setShowPassword((prevState) =>!prevState)}/>)
                          }

                    </div>
                    <div className='flex flex-wrap justify-between '>
                        <div className=''>
                            Don't have an account? 
                            <Link to={'/sign-up'}>
                               <span className='text-red-600 hover:text-red-700 transition ease-in-out'> Register</span>

                            </Link>
                        </div>
                        <div className='text-blue-600 font-bold hover:text-blue-700 transition ease-in-out'>
                          
                            <Link to={'/forgot-password'}>
                                Forgot password?

                            </Link>
                        
                       </div>
                    </div>
                    <input className='w-full h-11 bg-blue-600 text-white text-sm font-semibold  rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out ' type="submit" value="SIGN IN" name="" id="" />
                    <div className='flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 '>
                        <p className='font-semibold text-center'>OR</p>
                    </div>
                    <OAUTH/>
                    
                    
                </form>
            </div>
        </div>
     </section>
  )
}
