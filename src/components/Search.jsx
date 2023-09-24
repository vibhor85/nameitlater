import { useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [err, seterr] = useState(false);

  const { user } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setNewUser(doc.data());
      });
    } catch (error) {
      console.error(error.message);
      seterr(false);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleOnClick = async () => {
    const combinedId =
      user.uid > newUser.uid ? user.uid + newUser.uid : newUser.uid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "usersChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: newUser.uid,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChat", newUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(error);
    }
    setNewUser(null);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          onKeyDown={handleKeyDown}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <p>Something went wrong</p>}
      {newUser && (
        <div className='userChat' onClick={handleOnClick}>
          <img src={newUser.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{newUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
