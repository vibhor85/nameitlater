import { useContext, useState } from "react";
import addImage from "../assets/add-picture.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const attachImage = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleonclick = async () => {
    try {
      console.log(img);
      if (img) {
        const storageRef = ref(storage, String(Math.random()));
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (error) => {
            // setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: String(Math.random()),
                    text,
                    senderId: user.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: String(Math.random()),
            text: text,
            senderId: user.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "usersChat", user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChat", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }
      setText("");
      setImg(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type Something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className='send'>
        <img src='' alt='' />
        <input
          type='file'
          id='file'
          style={{ display: "none" }}
          onChange={attachImage}
        />
        <label htmlFor='file'>
          <img src={addImage} alt='' />
        </label>
        <button onClick={handleonclick}>Send</button>
      </div>
    </div>
  );
};
export default Input;
