import React from 'react';

const JobInfo = ({ jobs }) => {
  // Check if jobs array is empty or undefined
  if (!jobs || jobs.length === 0) {
    return <div className="text-center text-gray-500 text-xl mt-10">No jobs available</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {jobs.map((job, index) => (
        <div 
          key={index} 
          className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-start">
            {job.imageUrl && (
              <img src={job.imageUrl} alt={job.title} className="w-24 h-24 rounded-lg object-cover mr-6" />
            )}
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{job.title}</h2>
              <p className="mb-2"><strong>Type:</strong> <span className="text-gray-600">{job.type}</span></p>
              <p className="mb-2"><strong>Experience:</strong> <span className="text-gray-600">{job.experience}</span></p>
              <p className="mb-2"><strong>Location:</strong> <span className="text-gray-600">{job.location}</span></p>
              <p className="mb-2"><strong>Company:</strong> <span className="text-gray-600">{job.company}</span></p>
              <p className="mb-2"><strong>Salary:</strong> <span className="text-gray-600">{job.salary}</span></p>
              <p className="mb-2"><strong>Description:</strong> <span className="text-gray-600">{job.jobDescription}</span></p>
              <p className="mb-2"><strong>Requirements:</strong> <span className="text-gray-600">{job.requirements}</span></p>
              <p className="mb-2"><strong>Responsibilities:</strong> <span className="text-gray-600">{job.responsibilities}</span></p>
              <p className="mb-2"><strong>Skills:</strong> <span className="text-gray-600">{job.skills}</span></p>
              <p className="text-sm text-gray-500"><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobInfo;
