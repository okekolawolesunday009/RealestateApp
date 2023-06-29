import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { collection, query, where, orderBy, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FcHome } from 'react-icons/fc';
import { db } from '../firebase';
import Listingitem from '../Components/ListingItem';

export default function Profile() {
  const [changeProfileName, setChangeProfileName] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  function onEdit(listingID){

    navigate(`/edit-listing/${listingID}`)

  }
 async function onDelete(listingID){
    if(window.confirm("Are you sure you want to delete")){
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
        );
        setListings(updatedListings);
        toast.success("Successfully deleted Listing");
    }

  }

  useEffect(() => {
    async function fetchDataFromFirestore() {
      try {
        const listingRef = ( collection(db, 'listings'))
        let fetchedListings = [];
        const q = query(listingRef,
         where ('userRef', '==', auth.currentUser.uid)
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

  async function submit() {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });

        toast.success('Profile details updated');
      }
    } catch (error) {
      toast.error('Could not update profile');
    }
  }

  function handleChange() {
    setChangeProfileName((prevState) => !prevState);
    changeProfileName && submit();
  }

  function handleChangeName(e) {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate('/');
  }
    
  return (
    <>
    <section className='max-w-xl mx-auto flex justify-center flex-col'>
        <h1 className='text-3xl mt-6 font-bold text-center'>Profile </h1>
    <form action="" className='w-full md:w[50%] mt-6 px-3 flex gap-4 flex-col'>
          <input
                     className={`text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out
                      ${changeProfileName && "bg-red-200"}`}
                     value={name}
                     disabled ={!changeProfileName} 
                     onChange={handleChangeName}
                     type="text"
                  
                     name="name" id="name" />
          <input
                     className={`text-xl text-gray-700 w-full h-11 rounded-xl px-4 py-2  border-gray-300 transition ease-in-out`}
                     value={email}
                     onChange={handleChange}
                     type="email"
                  
                     name="email" id="email" />

          <div className="flex justify-between whitespace-no-wrap ">
          <div className='text-sm md:text-sm sm:text-lg lg:text-lg '>Do you want to change your name <span className='text-red-600 ml-1 hover:text-red-700 cursor-pointer transition ease-in-out duration-200' 
           onClick={handleChange}>
          {changeProfileName ? "Apply changes" : "edit"}
          </span>
          </div>
          <div className='text-blue-600 ml-1 hover:text-blue-700 cursor-pointer transition ease-in-out duration-200 text-sm md:text-sm sm:text-lg lg:text-lg' onClick={onLogout}>Sign out</div>
          </div>
          <button type='submit' className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800 hover:shadow-lg'>
             <Link to={'/create-listing'} className="flex justify-center items-center">
                <FcHome className='mr-2 text-2xl bg-red-200 rounded-full p-1 border-2'/>
                Sell or rent your home
             </Link>
           
          </button>
      </form>
    
     </section>
     <div className='mt-6'>
    

     {listings !== null && !loading && (
      <>
       <h2 className='text-center font-semibold text-2xl'>My listing</h2>
       <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6 '>
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
              <p>Loading...</p>
            )}
            {console.log(listings)}
        
       </ul>
      </>
     )}
      </div>
     
     

     </>
     
    
  )
}
