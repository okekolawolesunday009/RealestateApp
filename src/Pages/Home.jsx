import React, { useEffect, useState } from 'react'
import SignIn from './SignIn'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import Slider from '../Components/Slider';
import { getAuth } from 'firebase/auth';

export default function Home() {

 
  return (
    <div className=''>
      <Slider/>
        home
    </div>
  )
}
