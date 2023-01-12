import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import OAUTH from '../Components/OAUTH'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from '../firebase'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function SignUp() {

    const [showPassword, setShowPassword]= useState(false);
    const [formData , setFormData ] = useState({
        fname: "",
        email:"",
        password:""
    })
    const {email, password, fname} = formData;
    const navigate = useNavigate()
    function handleChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id] : e.target.value
        })) 
    }
//getting it from firebase auth doc
    async function onSubmit(e){
        e.preventDefault()
        try {
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(auth,email, password)
                updateProfile(auth.currentUser, {
                    displayName: fname
                })
                const user = userCredential.user;

                //trying to remove password
                const formDataCopy ={...formData }
                delete formDataCopy.password;
                //generates time
                formDataCopy.timestamp = serverTimestamp();
                //saving to database
                //uid gets the user id of the form in firbase console
                //users is the name of the new collection in the db in db
                await setDoc(doc(db, 'users', user.uid), formDataCopy);
                navigate("/");
                // console.log(user)
                // toast.success('registration successful')

                //after sign up use usenavigate hook to redirect to homepag
            
        } catch (error) {
    
            toast.error("Something went wrong with the registration")
            // console.log(error)
            
        }


    }
  return (
    <section>
        <h1 className='text-4xl text-center mt-6 font-bold'>Sign Up</h1>
        <div className='flex justify-center flex-wrap gap-5 items-center px-6 py-12 max-6xl'>
             <div className='lg:w-[40%] md-12 md: md-6 ' >
                <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="key" 
                className='w-full rounded-2xl'/>
            </div>
            <div className=' w-full md:mt-20 md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form action="" className='space-y-5' onSubmit={onSubmit}>
                    <div>
                    {/* <label htmlFor="" className='font-bold'>Email</label> */}
                    <input type="text"
                    className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                    placeholder='Full Name'
                    value={fname}
                    onChange={handleChange} name="fname" id="fname" />
                    </div>
                  
                    <div>
                    {/* <label htmlFor="" className='font-bold'>Email</label> */}
                    <input
                     className='text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out'
                     value={email}
                     onChange={handleChange}
                      type="email"
                       placeholder='Email' 
                       name="email"
                        id="email" />            
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
                            Have an account? 
                            <Link to={'/sign-in'}>
                               <span className='text-red-600 hover:text-red-700 transition ease-in-out'> Sign In</span>

                            </Link>
                        </div>
                        <div className='text-blue-600 font-bold hover:text-blue-700 transition ease-in-out'>
                          
                            <Link to={'/forgot-password'}>
                                Forgot password?

                            </Link>
                        
                       </div>
                      </div>
                   
                    <input className='w-full h-11 bg-blue-600 text-white text-xl font-semibold  rounded-md' type="submit" value="SIGN UP" name="" id="" />
                   
                    <div className='font-semibold text-center'>
                        OR
                    </div>
                   <OAUTH/>
                    
                </form>
            </div>
        </div>
     </section>
  )
}
