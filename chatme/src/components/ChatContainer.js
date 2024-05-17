import React, { useState, useEffect, useRef } from "react";

// import ChatInput from "./ChatInput";
// import Logout from "./Logout";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({currentChat}) => {

    // const [messages, setMessages] = useState([]);
    // const [arrivalMessage, setArrivalMessage] = useState(null);
 
 
    // useEffect(async () => {
        

    //     const fetch=async()=>{
    //         const data = await JSON.parse(
    //             localStorage.getItem('chat-app-user')
    //           );
    //           const response = await axios.post(recieveMessageRoute, {
    //             from: data._id,
    //             to: currentChat._id,
    //           });
    //           setMessages(response.data);
    //     }
    //   }, [currentChat]);
    
    //   useEffect(() => {
    //     const getCurrentChat = async () => {
    //       if (currentChat) {
    //         await JSON.parse(
    //           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    //         )._id;
    //       }
    //     };
    //     getCurrentChat();
    //   }, [currentChat]);


    //   const handleSendMsg = async (msg) => {
    //     const data = await JSON.parse(
    //       localStorage.getItem('chat-app-user')
    //     );
    //     socket.current.emit("send-msg", {
    //       to: currentChat._id,
    //       from: data._id,
    //       msg,
    //     });
    //     await axios.post(sendMessageRoute, {
    //       from: data._id,
    //       to: currentChat._id,
    //       message: msg,
    //     });
    
    //     const msgs = [...messages];
    //     msgs.push({ fromSelf: true, message: msg });
    //     setMessages(msgs);
    //   };
       
    //   useEffect(() => {
    //     if (socket.current) {
    //       socket.current.on("msg-recieve", (msg) => {
    //         setArrivalMessage({ fromSelf: false, message: msg });
    //       });
    //     }
    //   }, []);
    
    //   useEffect(() => {
    //     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    //   }, [arrivalMessage]);
    
    //   useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }, [messages]);

      

    return (
    <div className="grid grid-rows-[10%_80%_10%] md:grid-rows-[15%_70%_15%]">
         <div className="flex justify-between items-center px-8">
        <div className="flex items-center gap-[1rem]">
          <div className="avatar">
            <img className='h-[3rem]'
              src={`data:image/svg+xml;base64,${currentChat.avatarImage} `}
              alt=""
            />
          </div>
          <div className="text-white">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="flex flex-col gap-[1rem] px-4 lg:px-8 overflow: auto;">
        {/* {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="max-w-40 overflow-wrap-break-word p-4 