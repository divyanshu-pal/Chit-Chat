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

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
   
    <div className="grid items-center  bg-[#080420] grid-cols-12 p-8 ">
      <div className="col-span-1  flex items-center text-white gap-4">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-2xl  text-[#ffff00c8] cursor-pointer"
          />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              pickerStyle={{
                position: "absolute",
                top: "-350px",
                backgroundColor: "#080420",
                boxShadow: "0 5px 10px #9a86f3",
                borderColor: "#9a86f3",
              }}
              emojiStyle={{
                backgroundColor: "#080420",
              }}
              scrollbarStyle={{
                width: "5px",
                backgroundColor: "#080420",
                "&-thumb": {
                  backgroundColor: "#9a86f3",
                },
              }}
              categoriesStyle={{
                button: {
                  filter: "contrast(0)",
                },
              }}
              searchStyle={{
                backgroundColor: "transparent",
                borderColor: "#9a86f3",
              }}
              groupStyle={{
                before: {
                  backgroundColor: "#080420",
                },
              }}
            />
          )}
        </div>
      </div>
      <form
        className="col-span-11 flex items-center gap-4 bg-white bg-opacity-20 rounded-full"
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-10/12 h-3/5 bg-transparent text-white border-none pl-4 text-lg outline-none selection:bg-[#9a86f3]"
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
