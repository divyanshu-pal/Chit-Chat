import React, { useState, useEffect, useRef } from "react";

import ChatInput from "./ChatInput";
import Logout from "./Logout";
 import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRouts";

const ChatContainer = ({currentChat,currentUser,socket}) => {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
 
 
    useEffect(() => {
               const fetch=async()=>{
            const data = await JSON.parse(
                localStorage.getItem('chat-app-user')
              );
              const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
              });
              setMessages(response.data);
        }
        fetch();
      }, [currentChat]);
    
      useEffect(() => {
        const getCurrentChat = async () => {
          if (currentChat) {
            await JSON.parse(
              localStorage.getItem('chat-app-user')
            )._id;
          }
        };
        getCurrentChat();
      }, [currentChat]);


      const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
          localStorage.getItem('chat-app-user')
        );
        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: data._id,
          msg,
        });
      
        await axios.post(sendMessageRoute, {
          from: data._id,
          to: currentChat._id,
          message: msg,
        });
           setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: true, message: msg }
        ]);
      }
       
       
      
       
      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }, []);
    
      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

      

    return (
    <div className="grid grid-rows-[10%_80%_10%] gap-[0.1rem] overflow-hidden md:grid-rows-[15%_70%_15%]">
    <div className="flex justify-between items-center px-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-full">
          <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" className="h-full"/>
        </div>
        <div className="text-white">
        <h3>{currentChat.username}</h3>
        </div>
      </div>
      <Logout/>
    </div>
    <div className="flex flex-col gap-4 p-4 overflow-auto">
         {messages.map((message) => {
        return (
          <div ref={scrollRef} key={uuidv4()} className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`} >
         
            <div className={`max-w-[40%] break-words p-4 text-lg rounded-lg text-gray-300 ${message.fromSelf ? "bg-[#4f04ff21]" : "bg-[#9900ff20]"}`}>
           
                <p>{message.message}</p>
            </div>
          </div>
        );
      })}
    </div> 
    <ChatInput handleSendMsg={handleSendMsg} />

    
  </div>
  )
}

export default ChatContainer