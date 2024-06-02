import React from 'react';
import { storage } from '../Config/AppwriteConfig';

const PreviewImage = ({ image }) => {

    const result = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_BUCKET_ID, // bucketId
        image.id, // fileId
    );
    // console.log(result);

    return (
        <div className=' flex gap-4'>
            {/* {result} */}
            <span className=" ">
            <img src={result.href} alt={image.name} width="50" height="30" className=' bg-cover' />
            </span>
            
            <span> {image.name} </span>
        </div>
    );
}

export default PreviewImage;
