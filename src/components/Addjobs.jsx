import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore'; // Import necessary Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Storage functions
import { db } from '../FireBase/FireBase';
import JobInfo from './JobInfo';

const AddJobForm = ({ fetchJobs }) => {
  const [formData, setFormData] = useState({
    postedOn: '',
    title: '',
    company: '',
    type: '',
    experience: '',
    location: '',
    skills: [],
    job_link: '',
    jobDescription: '',
    role: '',
    industryType: '',
    department: '',
    roleCategory: '',
    aboutCompany: '',
    imageUrl: '' // Add this field
  });

  const [image, setImage] = useState(null);
  const [addedJob, setAddedJob] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      const skillsArray = value.split(',');
      setFormData({
        ...formData,
        [name]: skillsArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert postedOn to Firestore Timestamp
      const postedOnTimestamp = Timestamp.fromDate(new Date(formData.postedOn));

      // Upload image to Firebase Storage
      let imageUrl = '';
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `job_images/${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update formData with the converted Timestamp and imageUrl
      const formDataWithTimestamp = {
        ...formData,
        postedOn: postedOnTimestamp,
        imageUrl: imageUrl
      };

      // Add formDataWithTimestamp to Firestore
      const docRef = await addDoc(collection(db, 'jobs'), formDataWithTimestamp);
      console.log('Document written with ID: ', docRef.id);

      // Reset form data
      setFormData({
        postedOn: '',
        title: '',
        company: '',
        type: '',
        experience: '',
        location: '',
        skills: [],
        job_link: '',
        jobDescription: '',
        role: '',
        industryType: '',
        department: '',
        roleCategory: '',
        aboutCompany: '',
        imageUrl: ''
      });
      setImage(null);

      // Set the newly added job to display it
      setAddedJob(formDataWithTimestamp);

      // Refresh the job list
      fetchJobs();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="postedOn" className="block text-gray-700 text-sm font-bold mb-2">Posted On:</label>
          <input type="date" id="postedOn" name="postedOn" value={formData.postedOn} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <select id="title" name="title" value={formData.title} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Title</option>
            <option value="IOS Developer">iOS Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Android Developer">Android Developer</option>
            <option value="Developer Advocate">Developer Advocate</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 text-sm font-bold mb-2">Experience:</label>
          <select id="experience" name="experience" value={formData.experience} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Experience Level</option>
            <option value="Fresher">Fresher</option>
            <option value="Junior Level">Junior Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company:</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Type</option>
            <option value="Full Time">Full-time</option>
            <option value="Part Time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
          <select id="location" name="location" value={formData.location} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Location</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="In-Office">In-office</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">Skills:</label>
          <input type="text" id="skills" name="skills" value={formData.skills.join(',')} onChange={handleChange} placeholder="Comma separated skills" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="job_link" className="block text-gray-700 text-sm font-bold mb-2">Job Link:</label>
          <input type="text" id="job_link" name="job_link" value={formData.job_link} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">Job Description:</label>
          <textarea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="industryType" className="block text-gray-700 text-sm font-bold mb-2">Industry Type:</label>
          <input type="text" id="industryType" name="industryType" value={formData.industryType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
          <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="roleCategory" className="block text-gray-700 text-sm font-bold mb-2">Role Category:</label>
          <input type="text" id="roleCategory" name="roleCategory" value={formData.roleCategory} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutCompany" className="block text-gray-700 text-sm font-bold mb-2">About Company:</label>
          <textarea id="aboutCompany" name="aboutCompany" value={formData.aboutCompany} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Company Logo:</label>
          <input type="file" id="image" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Job</button>
        </div>
      </form>
      {addedJob && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4">Job Added</h2>
          <JobInfo job={addedJob} />
        </div>
      )}
    </div>
  );
};

export default AddJobForm;
