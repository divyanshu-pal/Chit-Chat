
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="relative grid items-center grid-cols-12 bg-[#080420] p-8 md:gap-4">
      <div className="col-span-1 flex items-center text-white gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-2xl text-[#ffff00c8] cursor-pointer"
          />
          {showEmojiPicker && (
            <div className="absolute bottom-16 z-10">
              <Picker
                onEmojiClick={handleEmojiClick}
                pickerStyle={{
                  position: "absolute",
                  top: "-350px",
                  backgroundColor: "#080420",
                  boxShadow: "0 5px 10px #9a86f3",
                  borderColor: "#9a86f3",
                }}
              />
            </div>
          )}
        </div>
      </div>
      <form
        className="col-span-11 flex items-center gap-1 bg-yellow-500 bg-opacity-20 rounded-full"
        onSubmit={sendChat}
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="flex-1 bg-transparent text-white border-none pl-4 text-lg outline-none selection:bg-[#9a86f3]"
        />
        <button
          type="submit"
          className="py-1.5 px-8 bg-[#9a86f3] rounded-full flex justify-center items-center border-none text-white"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
