import React, { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type:"rent",
        name: "",
        bedrooms: 1,
        bathrooms: 2,
        description: "",
        address: "",
        parking: true,
        furnished: true,
        offer: false,
        regularPrice: 1,
        discountPrice: 0


    })
    const {type, name, bedrooms, bathrooms, description,address, offer, regularPrice, discountPrice, parking, furnished} = formData
    function onChange(e){
      
      let boolean = null;
      if(e.target.value === "true"){
        boolean = true;
      }
      if(e.target.value === "false"){
        boolean = false;
      }
      if(e.target.files){
        setFormData((p) =>({
          ...p,
          images: e.target.files
        }))
      }
      //text/boolean/number (files- if it has files inside it)
      if(!e.target.files){
        setFormData((p) =>({
          ...p,
          [e.target.id]: boolean ?? e.target.value
          //we want the true and false to be considered so boolean state can be either if not 
        }))
      }
    }
  return (
   <main className='px-6 mx-auto lg:max-w-lg'>
    <h1 className="text-3xl text-center mt-6 font-bold" >
        Create a Listing </h1>
       
       <form action="">
          <p className="text-lg mt-6 font-semibold"> Sell / Rent</p>
          <div className="flex gap-4 ">
              <button type="button" id="type" value="sale"
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                sell
              </button>
              <button type="button" id="type" value="rent"
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                Rent
              </button>
          </div>
          <div className='flex  mt-6'>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Beds</label>
               <input type="number" name="bedrooms" id="bedrooms" 
               onChange={onChange}
               value={bedrooms}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm'  />
               
            </div>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Baths</label>
               <input type="number" name="bathrooms" id="bathrooms" 
               onChange={onChange}
               value={bathrooms}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm'  />
               
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Name</label>
               <input type="text" name="name" id="name" 
                value={name}
               onChange={onChange}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' maxLength={43} minLength={10} placeholder="Full Name" />
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Parking spot</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id="parking" value={true}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !parking ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                yes
              </button>
              <button type="button" id="parking" value={false}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ parking ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
                </div>
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Furnished</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id='furnished'  value={true}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !furnished? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                yes
              </button>
              <button type="button"  id='furnished' value={false}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ furnished  ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
                </div>
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Address</label>
               <textarea  name="address" id="address"
                // value={description}
                onChange={onChange}
               value={address} className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' placeholder="Address" />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Description</label>
               <textarea  type="text" name="description" id="description" 
                value={description}
               onChange={onChange}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' placeholder="Description" />
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Offer</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id="offer" value={true}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !offer ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                Yes
              </button>
                <button type="button" id="offer" value={false}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ offer ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
             
                </div>
           </div>
           <div className='flex  gap-2 mt-6'>
               <div className=' flex flex-col gap-4'>
               <label className='text-lg font-medium'> Regular Price</label>
               <input type="number" name="regularPrice" id="regularPrice" 
               onChange={onChange}
               value={regularPrice}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm' maxLength={43} minLength={10}  />
               </div>
               <div>
                <p>$/Month</p>
               </div>
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Discount Price</label>
               <input type="number" name="discountPrice" id="discountPrice" 
               onChange={onChange}
               value={discountPrice}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' maxLength={43} minLength={10}  />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Images</label>
               <p className='text-gray-600'>The first image will be cover (max-6)</p>
               <div  className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm bg-white py-3 px-2 '>
                
               <input type="file" id="images" accept=".jpg,.png,.jpeg" required={offer} multiple
               onChange={onChange} className='w-full px-3 py-1.5 border border-gray-300 rounded'
            //    value={discountPrice}
                 />
                
               </div>
              
          </div>
          <button type='submit' className='w-full mt-6 mb-6 bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800 '>
               Create Listing
          </button>

          

       </form>


    </main>
  )
}
