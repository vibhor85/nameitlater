import videoImage from "../assets/video-call.png";
import more from "../assets/more.png";
import addPerson from "../assets/add-person.png";
import Messages from "./Messages";
import Input from "./Input";
import Chats from "./Chats";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user.displayName}</span>
        <div className='chatIcons'>
          <img src={videoImage} alt='' />
          <img src={addPerson} alt='' />
          <img src={more} alt='' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
export default Chat;
