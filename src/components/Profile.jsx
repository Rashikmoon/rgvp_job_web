// src/components/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../FireBase/FireBase';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photoUrl: '',
    resumeUrl: ''
  });
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'photo') {
      setPhoto(e.target.files[0]);
    } else if (e.target.name === 'resume') {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.firstName || !profileData.lastName || !profileData.age) {
      setErrorMsg('Please fill all the required fields');
      return;
    }
    setErrorMsg('');

    try {
      const user = auth.currentUser;

      // Upload photo to Firebase Storage
      let photoUrl = '';
      if (photo) {
        const storage = getStorage();
        const photoRef = ref(storage, `profilePhotos/${photo.name}`);
        await uploadBytes(photoRef, photo);
        photoUrl = await getDownloadURL(photoRef);
      }

      // Upload resume to Firebase Storage
      let resumeUrl = '';
      if (resume) {
        const storage = getStorage();
        const resumeRef = ref(storage, `resumes/${resume.name}`);
        await uploadBytes(resumeRef, resume);
        resumeUrl = await getDownloadURL(resumeRef);
      }

      // Save profile data to Firestore
      await setDoc(doc(db, 'profiles', user.uid), {
        ...profileData,
        photoUrl,
        resumeUrl
      });

      navigate('/');
    } catch (error) {
      console.error('Error saving profile: ', error);
      setErrorMsg('Error saving profile');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-4">Complete Your Profile</h2>
          <input
            type="text"
            className="rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
          <input
            type="number"
            className="rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Age"
            name="age"
            value={profileData.age}
            onChange={handleChange}
          />
          <input
            type="file"
            className="mb-4"
            name="photo"
            onChange={handleFileChange}
          />
          <input
            type="file"
            className="mb-4"
            name="resume"
            onChange={handleFileChange}
          />
          <p className="text-center text-red-700 items-center justify-center font-bold">{errorMsg}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
