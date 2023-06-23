import React, {useEffect, useState} from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Listingitem from './ListingItem';


export default function Fetch({listing, id}) {

const firebaseConfig = {
    apiKey: "AIzaSyCNCQxtwDN4VTPA6WjZfooYEsbsk7Ay_V4",
    authDomain: "realestate-react-d496c.firebaseapp.com",
    projectId: "realestate-react-d496c",
    storageBucket: "realestate-react-d496c.appspot.com",
    messagingSenderId: "76357473580",
    appId: "1:76357473580:web:7f507d4f185d5c89c8c889"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
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
        
         <Listingitem key={listing.id} listing = {listing.data}/>           
                      
               
       
      ))
    ) : (
       <div className='lds-facebook spinner'><div></div><div></div><div></div></div>
     
    )}
  </div>
  )
}
