const Login = () => {
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>Chat app</span>
        <span className='title'>Login</span>
        <form action=''>
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
        <p>You don't have account? Register</p>
      </div>
    </div>
  );
};
export default Login;
