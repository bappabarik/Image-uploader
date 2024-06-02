import React from 'react';
import PreviewImage from './PreviewImage';
import { Link } from 'react-router-dom';

const ImageList = ({ images, Delete }) => {
  console.log("images",images);

  return (
    <div className=' flex flex-col items-start gap-4 p-2 overflow-y-scroll'>
      
      { images.length !== 0 ? (images.map((image) => (
        <div key={image.id} className=' flex gap-2 items-center border-b-2 border-slate-700 p-2 w-full justify-between'>
          <Link
            to={`/uploads/${image.id}`}
            target='_blank'
          >
          
           <PreviewImage image={image} />
              
          </Link>

          <button onClick={()=> Delete(image.id)} className=' text-md px-0 py-0 h-8 w-8 text-center'>❌</button>
          
        </div>
      ))) : (
      images.length !== 0 ? (<p>Loading...</p>):
      (<p className=' text-lg text-red-500'> You have no images please upload !  </p>)
    )
    }
    </div>
  );
};

export default ImageList;
