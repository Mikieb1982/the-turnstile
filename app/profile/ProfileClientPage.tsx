// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef, useActionState } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth, storage } from '@/lib/firebase'; // Import storage
// ... other imports

// ...

export default function ProfileClientPage({
  user,
  profile,
  teams,
}: ProfileClientPageProps) {
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || '/user-placeholder.png'
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  const handleImageClick = () => fileInputRef.current?.click();

  // --- This is the new implementation ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      // 1. Create a reference
      const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
      
      // 2. Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // 3. Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // 4. Update the Firebase Auth user profile
      await updateProfile(user, { photoURL: downloadURL });

      // 5. Update the local state to show the new image
      setPhotoURL(downloadURL);

    } catch (error) {
      console.error("Error uploading image: ", error);
      // You could set an error message in the 'state' here
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <main /* ... */ >
      {/* ... */}
      <form /* ... */ >
        {/* Add the file input element */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
          accept="image/png, image/jpeg"
        />
        
        {/* Make the avatar clickable */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleImageClick}
            disabled={uploading}
            className="relative mx-auto h-24 w-24 rounded-full"
          >
            <Image
              src={photoURL}
              alt="Profile"
              width={96}
              height={96}
              className={`rounded-full object-cover ${uploading ? 'opacity-50' : ''}`}
            />
            {/* You can add a loading spinner here based on 'uploading' state */}
          </button>
        </div>
        
        {/* ... rest of the form ... */}
        
        <SubmitButton />
      </form>
    </main>
  );
}
