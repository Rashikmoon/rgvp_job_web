// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../FireBase/FireBase';

const Signup = () => {
  const navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [submitbuttondisabeld, setsubmitbuttondisabeld] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!values.name || !values.pass || !values.email) {
      seterrormsg("Fill all the Details");
      return;
    }
    seterrormsg("");
    setsubmitbuttondisabeld(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setsubmitbuttondisabeld(false);
        const user = res.user;
        updateProfile(user, {
          displayName: values.name,
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        setsubmitbuttondisabeld(false);
        seterrormsg(err.message);
        console.log("error", err.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSignUp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className='text-3xl font-bold mb-4'>Sign Up</h2>
          <input
            type="text"
            className='rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400'
            placeholder='Name'
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            type='email'
            className='rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400'
            placeholder='Email'
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className='rounded px-3 py-2 mb-4 w-full border-gray-300 focus:outline-none focus:ring focus:border-blue-400'
            placeholder='Password'
            name="pass"
            value={values.pass}
            onChange={handleChange}
          />
          <p className='text-center text-red-700 items-center justify-center font-bold'>{errormsg}</p>
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              submitbuttondisabeld ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitbuttondisabeld}
          >
            {submitbuttondisabeld ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;