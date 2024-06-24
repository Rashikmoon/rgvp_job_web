import React, { useState } from 'react';

const SearchBar = (props) => {
    const initialJobCriteria = {
        title: "",
        location: "",
        experience: "",
        type: ""
    };

    const [jobCriteria, setJobCriteria] = useState(initialJobCriteria);
    const [showNoFiltersMessage, setShowNoFiltersMessage] = useState(false);

    const handleChange = (e) => {
        setJobCriteria((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleClearFilters = async () => {
        setJobCriteria(initialJobCriteria);
        setShowNoFiltersMessage(false);
        await props.fetchJobs(jobCriteria);
    };

    const search = async () => {
        // Check if any filter criteria is selected
        const hasFilters = Object.values(jobCriteria).some(value => value !== "");
        if (!hasFilters) {
            setShowNoFiltersMessage(true);
            return;
        }
        setShowNoFiltersMessage(false);
        await props.fetchJobsCustom(jobCriteria);
    }

   

    return (
       <>
        <div className='flex gap-4 justify-center my-10'>
            <select onChange={handleChange} name='title' value={jobCriteria.title} className='w-64 py-3 pl-4 bg-zinc-300 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Role</option>
                <option value="IOS Developer">IOS Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Android Developer">Android Developer</option>
                <option value="Developer Advocate">Developer Advocate</option>
            </select>
            <select onChange={handleChange} name='type' value={jobCriteria.type} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
            </select>
            <select onChange={handleChange} name='location' value={jobCriteria.location} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Location</option>
                <option value="Remote">Remote</option>
                <option value="In-Office">In-Office</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <select onChange={handleChange} name='experience' value={jobCriteria.experience} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
                <option value="" disabled hidden>Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior Level">Junior Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
            <button onClick={search} className='w-64 bg-blue-500 text-white font-bold py-3 rounded-md'>Search</button>
            <button onClick={handleClearFilters} className='w-64 bg-red-500 text-white font-bold py-3 rounded-md'>Clear Filters</button>
           
        </div>
         <div className='flex flex-col mb-3'>
          
         {showNoFiltersMessage &&  <div className='flex text-center flex-col'> <p className="text-red-500">Please select at least one filter criteria</p>
         
          </div>}
          </div>
       </>
    );
};

export default SearchBar;
