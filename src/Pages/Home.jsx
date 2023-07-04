import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Slider from '../Components/Slider';
import { Link } from 'react-router-dom';
import Listingitem from '../Components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchedListings(){
      try{
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("offer", "==", true), orderBy("timeStamp", "desc"), limit(4));
        //excute query
        const querySnapshot = await getDocs(q);
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
      
        setOfferListings(listings);
        // console.log(listings,"dd");


      } catch (error){
        console.error('Error fetching data from Firestore:', error);
      }

    }
    fetchedListings();


  }, [])
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchedListings(){
      try{
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("type", "==", "rent"), orderBy("timeStamp", "desc"), limit(4));
        //excute query
        const querySnapshot = await getDocs(q);
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
      
        setRentListings(listings);
        // console.log(listings,"dd");


      } catch (error){
        console.error('Error fetching data from Firestore:', error);
      }

    }
    fetchedListings();


  }, [])
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchedListings(){
      try{
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("type", "==", "sale"), orderBy("timeStamp", "desc"), limit(4));
        //excute query
        const querySnapshot = await getDocs(q);
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
      
        setSaleListings(listings);


      } catch (error){
        console.error('Error fetching data from Firestore:', error);
      }

    }
    fetchedListings();


  }, [])

 
  return (
    <div className=''>
      <Slider/>
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
      {offerListings && offerListings != null && (
        <div className='m-2 mb-6 '>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers

          </h2>
          <Link to="/offers">
          <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>

          </Link>

          <ul className='sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {offerListings.map((listing, id) => 
            ( <Listingitem key ={listing.id} id = {listing.id} listing = {listing.data}/>))
            }
          </ul>
        </div>
        
        )}
         {rentListings && rentListings != null && (
        <div className='m-2 mb-6 '>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Rents</h2>
          <Link to="/offers">
          <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more rent</p>

          </Link>

          <ul className='sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {rentListings.map((listing) => 
            ( <Listingitem key ={listing.id}  id = {listing.id} listing = {listing.data}/>))
            }
          </ul>
        </div>
        
        )}
         {saleListings && saleListings != null && (
        <div className='m-2 mb-6 '>
          <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for Sale</h2>
          <Link to="/offers">
          <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more sales</p>

          </Link>

          <ul className='sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {saleListings.map((listing) => 
            ( <Listingitem key ={listing.id}  id = {listing.id} listing = {listing.data}/>))
            }
          </ul>
        </div>
        
        )}

      </div>

      <div>
        
      </div>
       
    </div>
  )
}
