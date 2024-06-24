import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/FireBase';


const NavBar = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <div className='h-20 flex items-center justify-between w-full bg-gray-800 text-white px-8 shadow-md'>
      <h1 className='text-3xl font-bold'>JobWeb</h1>
      <div className='flex items-center'>
        <button 
          onClick={() => navigate('/jobinfo')}
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          Job Info
        </button>
        {username ? (
          <>
            <span className='mr-4'>Welcome, {username}</span>
            <button 
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigate('/login')}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;