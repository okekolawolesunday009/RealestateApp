import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';

export default function Slider() {
    
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();
  useEffect(() => {
   
    async function fetchListing() {
      const listingRef = ( collection(db, 'listings'))
        let fetchedListings = [];
        const q = query(listingRef,
         orderBy("timeStamp", "asc"), limit(5)
         );

          const querySnapshot = await getDocs(q);
               
        querySnapshot.forEach((doc) => {
          fetchedListings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(fetchedListings);
        setLoading(false);
      }
      fetchListing();

        
  }, []);
//   if (listings 0){
//     return <></>
//   }
  return listings && <>
 
  <Swiper 
    slidesPerView={1}
    navigation
    pagination= {{type: "progressbar"}}
    effect='fade'
    autoplay = {{delay : 3000}}>
    {listings.map((listing, id) => (
      <SwiperSlide 
        key ={id} 
        onClick={() => navigate(`/category/${listing.data.type}/${listing.id}`)}
        >
        {/* {console.log(listing)} */}

        <div style ={{background: `url(${listing.data.imgUrls[id]}) center, no-repeat`, backgroundSize: "cover"}}
        className='w-full h-[300px]'>
           
        </div>
        <p className='shadow-lg opacity-90 p-2 bg-[#457b9d] mx-w-[90%] rounded-br-3xl text-[#f1faee] absolute left-1 top-3  font-semibold '>{listing.data.name}</p>
        {/* //if not null ?? */}
        <p className='shadow-lg opacity-90 p-2 bg-[#e63946] mx-w-[90%] rounded-br-3xl text-[#f1faee] absolute left-1 bottom-8 font-medium '>{listing.data.discountedPrice ?? listing.data.regularPrice}
        {listing.data.type === "rent" && " / month"}</p>
         

      </SwiperSlide>
      
    ))}
  </Swiper>
  </>
}
