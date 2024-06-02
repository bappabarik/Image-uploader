
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
import { account, storage } from '../Config/AppwriteConfig';
  
  const ImageView = () => {
    const { imageId } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          // const user = await account.get();
          // const userId = user.$id;
  
          // Ensure the user has permission to view the image
          // const result =  await storage.getFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, imageId);
          // console.log(result); 
          // if (!result.$permissions.includes(`read(\"user:${userId}\")`)) {
          //   throw new Error('You do not have permission to view this image.');
          // }

          const image = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, imageId)
  
          setImageUrl(image.href);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchImage();
    }, [imageId]);
  
    return (
      <div>
        {error ? <p style={{ color: 'red' }}>{error}</p> : <img src={imageUrl} alt="Full" />}
      </div>
    );
  };

export default ImageView;
