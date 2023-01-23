import React, { useState } from 'react'

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type:"rent",
        name: "name",
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
    const {type, name,  bedrooms, bathrooms, description,address, parking, furnished, offer, regularPrice, discountPrice} = formData
    function onChange(){}
  return (
   <main className='px-6 '>
    <h1 className="text-3xl text-center mt-6 font-bold" >
        Create a Listing </h1>
       
       <form action="">
          <p className="text-lg mt-6 font-semibold"> Sell / Rent</p>
          <div className="flex gap-4 ">
              <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                sell
              </button>
              <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                Rent
              </button>
          </div>
          <div className='flex  mt-6'>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Beds</label>
               <input type="number" name="" id="" 
               onChange={onChange}
               value={bedrooms}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm'  />
               
            </div>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Baths</label>
               <input type="number" name="" id="" 
               onChange={onChange}
               value={bathrooms}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm'  />
               
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Name</label>
               <input type="text" name="name" id="name" 
               onChange={onChange}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' maxLength={43} minLength={10} placeholder="Name" />
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Parking spot</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "rent" ? "bg-white text-black" : "bg-slate-600 text-whitw"  }`}>
                yes
              </button>
              <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
                </div>
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Furnished</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "rent" ? "bg-white text-black" : "bg-slate-600 text-whitw"  }`}>
                yes
              </button>
              <button type="button" id="type" value="sale"
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
                </div>
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Address</label>
               <textarea type="text" name="name" id="name"
               value={address} className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' placeholder="Address" />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Description</label>
               <textarea type="text" name="name" id="name"
               value={description} className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' placeholder="Address" />
          </div>
          <div className="flex flex-col ">
               <div>
               <p className="text-lg mt-6 font-semibold"> Offer</p>
               </div>
                <div className='flex gap-4 '>
                <button type="button" id="type" value={true}
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ offer ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                Yes
              </button>
                <button type="button" id="type" value={false}
               onChange={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !offer ? "bg-white text-black" : "bg-slate-600 text-white"  }`}>
                No
              </button>
             
                </div>
           </div>
           <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Regular Price</label>
               <input type="number" name="name" id="name" 
               onChange={onChange}
               value={regularPrice}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' maxLength={43} minLength={10}  />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Discount Price</label>
               <input type="number" name="name" id="name" 
               onChange={onChange}
               value={discountPrice}
               className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' maxLength={43} minLength={10}  />
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Images</label>
               <div  className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm bg-white py-3 px-2 '>
               <input type="file" name="name" id="name" 
               onChange={onChange}
            //    value={discountPrice}
                 />
                
               </div>
              
          </div>
          <button type='submit' className='w-full mt-6 bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800 hover: shadow-lg'>
           
               
               Create Listing
           
           
          </button>

          

       </form>


    </main>
  )
}
