import React, { useEffect, useState } from 'react';
import ImageUpload from './Components/ImageUpload';
import ImageList from './Components/ImageList';
import './App.css'
import { account, storage } from './Config/AppwriteConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const App = () => {
  const [images, setImages] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [error, setError] =  useState()
  const navigate = useNavigate()

  const handleUpload = (id, name) => {
    setImages((prevImages) => [...prevImages, { id, name }]);
   
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update after component unmount
    
      const getData = account.get()
      getData.then(Response => setUserDetails(Response))
      .catch(Error => setError(Error))

      console.log(getData);
  

    const fetchImages = async () => {
      try {
        const user = await account.get();
        const userId = user.$id;

        console.log(userId);

        
      
        if (isMounted) {
          const response = await storage.listFiles(import.meta.env.VITE_APPWRITE_BUCKET_ID);
          
          const userFiles = response.files.filter((item) => item.$permissions.includes(`read(\"user:${userId}\")`))
          
          console.log(userFiles);
          // setImages(userFiles);
          userFiles.map((item) => setImages((prevImages) => [...prevImages, { id: item.$id, name: item.name }]))
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };



    // if()

    fetchImages();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, []);

  const deleteFile = async (id) => {
    setImages(images.filter((image) => image.id !== id))
    await storage.deleteFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      id
  )
  }

 

  const handleLogout = async () => {
    try {
      await account.deleteSession("current")
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {
      userDetails ? (
      <>
      <div className=" flex gap-4 w-full justify-center align-top p-4 mb-4 items-center">
        <h1 className=' font-bold'>Hello <span  className=' text-orange-400 font-bold'>{userDetails.name}</span></h1>
        <button
        onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className=" flex md:flex-row flex-col gap-6 w-full justify-center md:m-12 md:p-12 p-4 md:items-start m-auto items-center bg-zinc-800 rounded-md">
      <div className=" flex flex-col gap-5 md:items-start items-center w-full">
      <h1 className=' font-bold md:text-4xl text-4xl'>Image Uploader</h1>
      <ImageUpload onUpload={handleUpload} />
      </div>
      <div className=" flex flex-col gap-4 items-start max-h-[30rem] w-full ">
      <h3 className=' text-2xl font-bold border-b-2 border-slate-100 w-full text-left p-1'>Images</h3>
      <ImageList images={images} Delete={deleteFile} />
      </div>
      </div>
      </>
      ) : (
          error ? (<p> You are not logged in please 
            <Link
            to="/"
            className=' ml-1'
            >
            Login
            </Link>
             </p>) : (<p>
            Loading...
          </p>)    
      )
    }
    </>
  );
};

export default App;
