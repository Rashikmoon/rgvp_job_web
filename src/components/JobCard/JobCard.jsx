import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = (props) => {
    const date1 = dayjs(Date.now());
    const diffinday = dayjs().startOf('day').diff(dayjs(props.postedOn), 'day');
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/jobs/${props.id}`);
    };

    const hasSkills = Array.isArray(props.skills) && props.skills.length > 0;

    return (
        hasSkills && (
            <div className='mx-auto my-6 max-w-4xl' onClick={handleCardClick}>
                <div className='flex justify-between bg-white p-6 items-center rounded-lg border border-gray-200 shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'>
                    {props.imageUrl && (
                        <img src={props.imageUrl} alt={props.title} className='w-24 h-24 rounded-lg object-cover mr-6' />
                    )}
                    <div className='flex-1'>
                        <h1 className='text-2xl font-bold mb-2 text-gray-800'>{props.title} - {props.company}</h1>
                        <p className='text-gray-600 mb-4'>{props.type} &#x2022; {props.experience} &#x2022; {props.location}</p>
                        <div className='flex gap-2 items-center mt-3 flex-wrap'>
                            {props.skills.map((skill, index) => (
                                <span className='px-3 py-1 border border-gray-300 rounded-full bg-gray-100 text-gray-700 text-sm' key={index}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <p className='text-green-600 mb-2'>
                            {diffinday > 1 ? `${diffinday} days ago` : `${diffinday} day ago`}
                        </p>
                        <a href={props.job_link} target='_blank' rel='noopener noreferrer'>
                            <button className='px-4 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12.5a1 1 0 10-2 0V9H7.5a1 1 0 000 2H9v1.5a1 1 0 002 0V11h1.5a1 1 0 000-2H11V7.5z" clipRule="evenodd" />
                                </svg>
                                Apply
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        )
    );
};

export default JobCard;
