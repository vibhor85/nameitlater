import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const {user} = useContext(AuthContext)

  const logoutHandler = () => signOut(auth);

  return (
    <div className='navbar'>
      <span className='logo'>Chat app</span>
      <div className='user'>
        <img
          src={user.photoURL}
          alt='user-image'
        />
        <span>{user.displayName}</span>
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
};
export default Navbar;
