import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef, listing}) {
    const [landLord, setLandLord] = useState(null);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        async function getLandLord(){
            const docRef = doc(db, "users", userRef);
            const  docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setLandLord(docSnap.data());

            }else {
                toast.error(
                    "could not get landload or data"
                )
            }


        }
        getLandLord();
    }, [userRef]);
    function onchange(e){
        setMessage(e.target.value);
    }
  return (
     <>
     { landLord !== null && (
            <div className='flex flex-col text-sm lg:text-lg mt-5 space-y-3'>
            <p>
              Contact <span className='font-bold'>{landLord.name} </span> for the family home in a central
            </p>
            <textarea
            onChange={onchange}
             placeholder='Message'
             />
            
            <a className='bg-blue-600 rounded-md p-4 text-white text-center font-semibold'
            href ={`malto:${landLord.email}?Subject= ${landLord.name}&body${message}`}>SEND MESSAGE</a>
          </div>

     )}
     </>
     
  )
}
