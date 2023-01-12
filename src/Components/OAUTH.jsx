import { async } from '@firebase/util';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify';
import { getAuth} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom';


export default function OAUTH() {

  const navigate = useNavigate()


 async function onGoogleClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // console.log(user)

      //check for the error

      //address
      const docRef = doc(db,'users', user.uid)
      //check document and put it docsnap
      const docSnap = await getDoc(docRef)
      if(!docSnap.exists()){
        await setDoc(docRef, {
          fname:user.displayName,
          email: user.email,
          timestamp: serverTimestamp()

        })
      }
      navigate("/")

    } catch (error) {
      toast.error("could not authorize with google")
      
    }

  }
  return (
    <div className='font-semibold flex justify-center items-center gap-2 w-full h-11 rounded-md shadow-md   text-white text-sm  bg-red-600 hover:bg-red-700 transition duration-100 active:bg-red-800'>
        <FcGoogle className=''/>
        <button 
        type='button'
        onClick={onGoogleClick}  className='text-1xl' >Continue with Google</button>
                       
      </div>
  )
}
