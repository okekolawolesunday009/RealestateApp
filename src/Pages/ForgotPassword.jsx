import React from 'react'
import { Link } from 'react-router-dom'
import OAUTH from '../Components/OAUTH'

export default function SignIn() {
  return (
    <section>
        <h1 className='text-4xl text-center mt-6 font-bold'>Sign In</h1>
        <div className='flex justify-center flex-wrap gap-5 items-center px-6 py-12 max-6xl'>
        <div className='md:w-[50%] lg: w-[100%] md-12 md: md-6'>
                <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="key" 
                className='w-full rounded-2xl'/>
            </div>
            <div className=' w-full md:mt-20 md:w-[67%] lg:w-[40%] lg:ml-20 '>
                <form action="" className='space-y-5'>
                    <div>
                        {/* <label htmlFor="" className='font-bold'>Email</label> */}
                        <input className='text-xl w-full h-11 rounded-xl px-3 border' type="email" placeholder='Email' name="" id="" />
                    </div>
                    <div className='flex flex-wrap justify-between '>
                        <div className=''>
                            Don't have an account? 
                            <Link to={'/sign-up'}>
                               <span className='text-red-600 hover:text-red-700 transition ease-in-out'> Register</span>

                            </Link>
                        </div>
                        <div className='text-blue-600 font-bold hover:text-blue-700 transition ease-in-out'>
                          
                            <Link to={'/sign-in'}>
                                Sign In

                            </Link>
                        
                       </div>
                    </div>
                    <input className='w-full h-11 bg-blue-600 text-white text-xl font-semibold  rounded-md' type="submit" value="SEND RESET PASSWORD" name="" id="" />
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
