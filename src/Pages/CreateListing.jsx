import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import {useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// import { doc, updateDoc } from 'firebase/firestore';


export default function CreateListing() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  

    const [formData, setFormData] = useState({
        type:"rent ",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        description: "",
        address: "",
        parking: true,
        furnished: true,
        offer: false,
        regularPrice: 1,
        discountPrice: 0,
        images:[]


    })
    const {type, name, bedrooms, bathrooms, description,address, offer, regularPrice, discountPrice, parking, furnished, images} = formData

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
          //we want the true and false to be considered so boolean state can be either if not set it to value (??) using this
        }))
      }
    }
    async function submit(e){
      e.preventDefault();
      setLoading(true);
      if(+discountPrice >= +regularPrice){
        setLoading(false);
        toast.error("discount price needs to be less than regular price")
        return;

      }
      if(images.length > 6){
        setLoading(false);
        toast.error("images cannot be more than 6");
        return;
      }

      

        async function storeImage(image){
           return new Promise((resolve, reject) => {
             const storage = getStorage();
             const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
             const storageRef = ref(storage, filename);
             const uploadTask = uploadBytesResumable(storageRef, image);

             //copy this from firstore
             uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            setLoading(false);
            reject(error)
          }, 
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL); // Resolve with the download URL
            } catch (error) {
              reject(error);
              setLoading(false);
            }
          }
         
        );
                      
          })
        
       }
      const imgUrls = await Promise.all(
        [...images].map((image) => 
        storeImage(image))
        ).catch((error)=>{
          setLoading(false);
          toast.error("images not uploaded size(less than 2Mb)");
          return;
        });
        
    
      console.log("submitted image")
      console.log(imgUrls)
      //store to db
      const formDataCopy = {
        ...formData,
        imgUrls,
        timeStamp: serverTimestamp(),
        userRef: auth.currentUser.uid

      };
      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountPrice;
      const docRef = await addDoc(collection(db, "listings"), formDataCopy);
      setLoading(false);
      toast.success("listing created");
      navigate(`category/${formDataCopy.type}/${docRef.id}`);
    }


    //spiner-loading
    if(loading){
      return <div className='lds-facebook spinner'><div></div><div></div><div></div></div>;
    }

    

    
    
  return (
   <main className='px-6 pt-[100px] mx-auto lg:max-w-lg'>
    <h1 className="text-3xl text-center mt-6 font-bold" >
        Create a Listing </h1>
       
       <form action="" onSubmit={submit}>
          <p className="text-lg mt-6 font-semibold"> Sell / Rent</p>
          <div className="flex gap-4 ">
              <button type="button" id="type" value="sale"
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "rent" ? "bg-white text-slate-600" : "bg-slate-600 text-white"  }`}>
                sell
              </button>
              <button type="button" id="type" value="rent"
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ type === "sale" ? "bg-white text-slate-600" : "bg-slate-600 text-white"  }`}>
                Rent
              </button>
          </div>
          <div className='flex  mt-6  space-x-6'>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Beds</label>
               <input type="number" name="bedrooms" id="bedrooms" 
               onChange={onChange}
               value={bedrooms}
               max="50"
               min="1"
               className='px-4 py-2  shadow-md hover:shadow-lg focus:shadow-lg text-center active:shadow-lg transition duration-150 ease rounded-sm'  />
               
            </div>
            <div className='flex flex-col'>
            <label className='text-lg font-medium'> Baths</label>
               <input type="number" name="bathrooms" id="bathrooms" 
               onChange={onChange}
               value={bathrooms}
               max="50"
               min="1"
               className=' text-center shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease  rounded-sm'  />
               
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Name</label>
               <input type="text" name="name" id="name" 
                value={name}
                required
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
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !furnished
                ? "bg-white text-black" 
                : "bg-slate-600 text-white"  }`}>
                yes
              </button>
              <button type="button"  id='furnished' value={false}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${
                 furnished 
                  ? "bg-white text-black"
                   : "bg-slate-600 text-white"  
                   }`}>
                No
              </button>
                </div>
          </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Address</label>
               <textarea  name="address" id="address"
                onChange={onChange}
               value={address}
                className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm' placeholder="Address" />
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
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ !offer
                ? "bg-white text-black" 
                : "bg-slate-600 text-white"  }`}>
                Yes
              </button>
                <button type="button" id="offer" value={false}
               onClick={onChange} className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full ${ 
                offer 
                ? "bg-white text-black" 
                : "bg-slate-600 text-white"  }`}>
                No
              </button>
             
                </div>
           </div>
           <div className='flex  gap-2 mt-6'>
               <div className=' flex flex-col gap-4'>
               <label className='text-lg font-medium'> Regular Price</label>
               <div className='flex space-x-4 items-center'>
               <input type="number" name="regularPrice" id="regularPrice" 
               onChange={onChange}
               value={regularPrice}
               className='text-center shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm' maxLength={43000000} minLength={10}  />
             
             
                {type === "rent" && (<p>$/Month</p>)}
                </div>
               </div>
          </div>
          <div className='flex  items-center'>
          {offer && (
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Discount Price</label>
               <div className='flex space-x-4 items-center'>
               <input type="number" name="discountPrice" id="discountPrice" 
               onChange={onChange}
               required ={offer}
               value={discountPrice}
               className='text-center shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-[50%] rounded-sm' maxLength={430} minLength={10}  />


                {type === "rent" && (<p>$/Month</p>)}
                </div>
          </div>
              

           )}
           
               <div>
              
              </div>

            </div>
          <div className='flex flex-col gap-2 mt-6'>
               <label className='text-lg font-medium'> Images</label>
               <p className='text-gray-600'>The first image will be cover (max-6) size-less than 2Mb</p>
               <div  className='shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease w-full rounded-sm bg-white py-3 px-2 '>
                
               <input type="file" id="images" accept=".jpg,.png,.jpeg"
                required={offer}
                multiple
                onChange={onChange} 
               className='w-full px-3 py-1.5 border border-gray-300 rounded'
            
                 />
                
               </div>
              
          </div>
          <button
           type='submit' className='w-full mt-6 mb-6 bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800 '>

               Create Listing
          </button>

          

       </form>


    </main>
  )
}
