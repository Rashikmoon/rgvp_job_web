import { Facebook, GitHub, Google } from "@mui/icons-material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../FireBase/FireBase";

const Login = ({ onUserSignedIn }) => {
  const navigate = useNavigate();
  const [errormsg, seterrormsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
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
    setsubmitbuttondisabeld(true); // Disable the button here

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setsubmitbuttondisabeld(false);
        const user = res.user;
        updateProfile(user, {
          displayName: values.name,
        }).then(() => {
          onUserSignedIn(user.displayName);
          navigate("/");
        });
      })
      .catch((err) => {
        setsubmitbuttondisabeld(false);
        seterrormsg(err.message);
        console.log("error", err.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!values.pass || !values.email) {
      seterrormsg("Fill all the Details");
      return;
    }
    seterrormsg("");
    setsubmitbuttondisabeld(true); // Disable the button here

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setsubmitbuttondisabeld(false);
        const user = res.user;
        onUserSignedIn(user.displayName);
        navigate("/");
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-500">JOBWEB</h1>
          <p className="text-lg text-black-600">Explore your interests, meet new friends & expand your horizons</p>
        </div>
        <div>
          {isLogin ? (
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className='text-3xl font-bold mb-4'>Sign In</h2>
              <div className='flex space-x-2 mb-4'>
                <div className="socialIcon">
                  <Facebook />
                </div>
                <div className="socialIcon">
                  <GitHub />
                </div>
                <div className="socialIcon">
                  <Google />
                </div>
              </div>
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
                className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                disabled={submitbuttondisabeld}
              >
                {submitbuttondisabeld ? 'Signing In...' : 'Sign In'}
              </button>
              <p className='text-sm mt-4'>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account</span></p>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className='text-3xl font-bold mb-4'>Sign Up</h2>
              <div className='flex space-x-2 mb-4'>
                <div className="socialIcon">
                  <Facebook className="text-blue-500" />
                </div>
                <div className="socialIcon">
                  <GitHub className="text-blue-500" />
                </div>
                <div className="socialIcon">
                  <Google className="text-blue-500" />
                </div>
              </div>
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
              <p className='text-sm mt-4'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account</span></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
