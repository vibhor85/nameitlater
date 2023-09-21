import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import addImage from "../assets/add-picture.png";
import { useState } from "react";
import { auth, storage } from "../firebase";
import { ref } from "firebase/storage";
const Register = () => {
  const [err, setErr] = useState(false);
  const handlesubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: displayName,
              photoURL: downloadURL,
            });
            console.log("File available at", downloadURL);
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'>Chat app</span>
        <span className='title'>Register</span>
        <form onSubmit={handlesubmit}>
          <input type='text' name='name' id='name' placeholder='Enter Name' />
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
          <input
            type='file'
            name='image'
            id='image'
            style={{ display: "none" }}
          />
          <label htmlFor='image'>
            <img src={addImage} alt='image' />
            <span>Add an Image</span>
          </label>
          <button type='submit'>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have account? Login</p>
      </div>
    </div>
  );
};
export default Register;
