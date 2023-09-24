import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const loginhandler = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setErr(true);
    }
  };
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>Chat app</span>
        <span className='title'>Login</span>
        <form onSubmit={loginhandler}>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter Email'
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Enter Password'
          />
          <button type='submit'>Login</button>
        </form>
        {err && <span>Something went wrong</span>}

        <p>
          You don't have account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
