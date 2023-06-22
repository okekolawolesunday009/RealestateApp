import React, {useEffect, useState} from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase';


export default function Fetch() {


const [listings, setListings] = useState(null);

  // Fetch data from Firestore
  useEffect(() => {
    async function fetchDataFromFirestore() {
      try {
        const querySnapshot = await getDocs(
            collection(db, 'listings'));
        let fetchedListings = [];
        // const q = query( collection(db, 'listings'),
        //  where('userRef', '==', auth.currentUser.uid),
        //   orderBy('timestamp', 'desc'));

        
        querySnapshot.forEach((doc) => {
          fetchedListings.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    }

    fetchDataFromFirestore();
  }, [db]);

  return (
    <div>
    {listings ? (
      listings.map((listing) => (
        <div key={listing.id}>
            <h2>{listing.id}</h2>
            {/* {listing.data.imgUrls &&
              listing.data.imgUrls.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt="" />
              ))}        */}
       </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}
