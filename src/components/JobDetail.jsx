import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../FireBase/FireBase';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const docRef = doc(db, 'jobs', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJob(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <p className="text-center text-gray-500 mt-10">Loading job details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
       {job.imageUrl && (
        <div className="flex justify-center mb-6">
          <img src={job.imageUrl} alt={`${job.company} logo`} className="w-32 h-32 object-contain" />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h1>
      <p className="text-xl font-semibold text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-600 mb-4">{job.type} &#x2022; {job.location} &#x2022; {job.experience}</p>
      <p className="text-gray-500 mb-6">{job.postedOn.toDate().toDateString()}</p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
        <p className="text-gray-700">{job.jobDescription}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills Required</h2>
        <div className="flex gap-2 items-center flex-wrap">
          {job.skills.map((skill, index) => (
            <span className="px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm" key={index}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <p className="text-gray-700">Role: {job.role}</p>
        <p className="text-gray-700">Industry Type: {job.industryType}</p>
        <p className="text-gray-700">Department: {job.department}</p>
        <p className="text-gray-700">Role Category: {job.roleCategory}</p>
        <p className="text-gray-700">About Company: {job.aboutCompany}</p>
      </div>
      <a href={job.job_link} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700">
        Apply Here
      </a>
    </div>
  );
};

export default JobDetail;
