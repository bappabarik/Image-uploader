import React, { useState } from 'react';
import { storage, account } from '../Config/AppwriteConfig';
import { ID, Permission, Role } from 'appwrite';

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const user = await account.get();
      const userId = user.$id;

      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file,
        [
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId)),
        ]
    );
    
      onUpload(response.$id, file.name);
      setFile('')
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div className=' flex'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
