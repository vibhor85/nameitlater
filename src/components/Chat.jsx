import videoImage from "../assets/video-call.png";
import more from "../assets/more.png";
import addPerson from "../assets/add-person.png";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>jane</span>
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
