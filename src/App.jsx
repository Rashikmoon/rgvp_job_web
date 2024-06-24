// src/App.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "./FireBase/FireBase";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import JobCard from "./components/JobCard/JobCard";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddJobForm from "./components/Addjobs";
import JobInfo from "./components/JobInfo";
import JobDetail from "./components/JobDetail";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

function App() {
  const [username, setUsername] = useState("");
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });
  }, []);

  const fetchJobs = async () => {
    const tempJobs = [];
    const jobref = query(collection(db, "jobs"));
    const q = query(jobref, orderBy("postedOn", "desc"));
    const qsnapshot = await getDocs(q);
    qsnapshot.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate()
      });
    });
    setJobs(tempJobs);
  };

  const fetchJobsCustom = async (jobCriteria) => {
    const tempJobs = [];
    const jobref = collection(db, "jobs");
    let queryRef = jobref;

    if (jobCriteria.title !== "") {
      queryRef = query(queryRef, where("title", "==", jobCriteria.title));
    }
    if (jobCriteria.type !== "") {
      queryRef = query(queryRef, where("type", "==", jobCriteria.type));
    }
    if (jobCriteria.experience !== "") {
      queryRef = query(queryRef, where("experience", "==", jobCriteria.experience));
    }
    if (jobCriteria.location !== "") {
      queryRef = query(queryRef, where("location", "==", jobCriteria.location));
    }

    const qsnapshot = await getDocs(queryRef);

    qsnapshot.forEach((job) => {
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });

    setJobs(tempJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleAddJobForm = () => {
    setShowAddJobForm(!showAddJobForm);
  };

  const handleUserSignedIn = (displayName) => {
    setUsername(displayName);
  };

  const showSearchBar = !['/signup', '/login'].includes(location.pathname);
  const showAddJobButton = location.pathname === "/";

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar username={username} />
      <div className="container mx-auto p-4">
        <h3 className="text-gray-800 font-bold text-center mt-7">{username && `Welcome, ${username}`}</h3>
        <Header />
        {showSearchBar && <SearchBar fetchJobs={fetchJobs} fetchJobsCustom={fetchJobsCustom} />}
        {jobs.length === 0 && (
          <p className="text-center text-red-500 mt-4">No jobs found matching the criteria.</p>
        )}
        <Routes>
          <Route path="/" element={
            <>
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
              {showAddJobButton && (
                <div className="text-center">
                  <button onClick={toggleAddJobForm} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4">
                    Add Job
                  </button>
                </div>
              )}
              {showAddJobForm && <AddJobForm fetchJobs={fetchJobs} />}
            </>
          } />
          <Route path="/login" element={<Login onUserSignedIn={handleUserSignedIn} />} />
          <Route path="/signup" element={
            <>
              <Signup />
              <div className="text-center">
                <button onClick={toggleAddJobForm} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4">
                  Add Job
                </button>
              </div>
              {showAddJobForm && <AddJobForm fetchJobs={fetchJobs} />}
            </>
          } />
          <Route path="/jobinfo" element={<JobInfo jobs={jobs} />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
