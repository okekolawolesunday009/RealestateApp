import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import Contact from '../Components/Contact';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);
  const auth = getAuth();

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      }
      setLoading(false);
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <div className='lds-facebook spinner'><div></div><div></div><div></div></div>;
  }

  const position = [51.505, -0.09]


  return (
    <main>
      <div>
        {listing && !loading && (
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: 'progressbar' }}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative w-full overflow-hidden h-[300px]'
                  style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover' }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-grey-400 rounded-full w-12 h-12 flex justify-center items-center " onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopy(true);
          setTimeout(() => {
            setShareLinkCopy(false);
          }, 2000);
        }}>
          <FaShare className='text-lg text-slate-500' />
        </div>

        {shareLinkCopy && (
          <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md z-10'>
            Link Copied
          </p>
        )}

        {listing && !loading && (
          <div className='flex mt-6 flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg shadow-lg  space-y-5 lg:space-x-5 '>
            <div className='h-auto lg-[400px]  '>
              <p className='text-xl font-bold lg:text-xl text-blue-900 mb-3 '>
                {listing.name} - ${" "} {listing.offer                
                  ? listing.regularPrice
                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : listing.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {listing.type === "rent" ? " / month" : ""}
              </p>
              <p className='flex items-center mt-6 mb-3 font-semibold'>
                <FaMapMarkerAlt className='text-green-700 mr-1' />
                {listing.address}
              </p>
              <div className='flex justify-start items-center space-x-4 w-[75%]'>
                <p className='bg-red-800 text-sm lg:text-base w-full md:text-base mx-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md '>
                  {listing.type === "rent" ? "Rent" : "Sale"}
                </p>
                {listing.offer && (
                  <p className= 'w-full text-sm  lg:text-base mx-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md bg-green-800'>
                    ${parseInt(listing.regularPrice) - parseInt(listing.discountPrice)} discount
                    {/* {console.log((listing))} */}
                  </p>
                )}
              </div>
              <p className='mt-3 mb-3'>
                <span className='font-semibold'>  Description </span>
                -  {listing.description}
              </p>
              <ul className='flex items-center sm:space-x-10 md:space-x-3 text-sm font-semibold'>
                <li className='font-semibold flex items-center whitespace-nowrap '>
                  <FaBed className='text-lg mr-1' />
                  {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}

                </li>
                <li className='font-semibold flex items-center whitespace-nowrap '>
                  <FaBath className='text-lg mr-1' />
                  {+listing.bathsroom > 1 ? `${listing.bathsroom} Baths` : "1 Bath"}

                </li>
                <li className='font-semibold flex items-center whitespace-nowrap '>
                  <FaParking className='text-lg mr-1' />
                  {+listing.parking > 1 ? `${listing.parking} Parking Spot` : "No-Parking "}

                </li>
                <li className='font-semibold flex items-center whitespace-nowrap '>
                  <FaChair className='text-lg mr-1' />
                  {+listing.furnished > 1 ? `${listing.furnished} Furnished` : "Not-Furnished "}

                </li>
              </ul>

              <div className='flex mt-2 flex-col text-sm lg:text-lg space-y-4'>
                {(listing.userRef !== auth.currentUser?.uid || contactLandLord === true) && (
                     <div className='mt-2'>
                        <Contact userRef = {listing.userRef}/>
                     </div>
                 
                )}
                {!contactLandLord  && 
                <button 
                 onClick={() => setContactLandLord(true)}
                className ='bg-blue-600 rounded-md p-4 text-white font-semibold hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 transition duration-150 ease-in-out'>
                    Contact LandLord
                </button>
                }
                
              </div>
            </div>

            <div className='w-full h-[200px] lg:h-[400px] z-10 overflow-x-hidden '>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}
            style={{height: "100%", width: "100%"}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
           
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
