import React, {useEffect, useState} from 'react'
import { getFirestore, collection, getDocs, deleteDoc, doc, where, orderBy, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Listingitem from './ListingItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';


export default function Fetch({listing, id}) {
  const navigate = useNavigate();
  const auth = getAuth();
  function onEdit(listingID){

    navigate(`/edit-listing/${listingID}`)

  }
 async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete")){
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings. filter(
        (listing) => listing.id !== listingID
        );
        setListings(updatedListings);
        toast.success("Successfully deleted Listing");
    }

  }

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
        const listingRef = ( collection(db, 'listings'))
        let fetchedListings = [];
        const q = query(listingRef,
         where ('useRef', '==', auth.currentUser.uid)
         )

          const querySnapshot = await getDocs(q);
          
          console.log(querySnapshot);

        
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
    <div className='max-w-6xl px-3 mt-6 mx-auto    flex'>
    {listings ? (
      listings.map((listing) => (
        
         <Listingitem
          key={listing.id} 
          listing = {listing.data}
          onDelete = {() => onDelete(listing.id)}        
          onEdit = {() => onEdit(listing.id)}
          />           
                      
               
       
      ))
    ) : (
       <div className='lds-facebook spinner'><div></div><div></div><div></div></div>
     
    )}
  </div>
  )
}
