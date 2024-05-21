import React, { useEffect, useState, useRef  } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { AllusersRoute,host } from "../utils/APIRouts";
import Contact from "../components/Contact"
import Welcome from '../components/Welcome'
import ChatContainer from "../components/ChatContainer";

export default function Chatt(){
  
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
   const[currentUser,setCurrentuser] = useState(undefined);
  useEffect(() => { 

     const functt = async ()=>{
        if (!localStorage.getItem("chat-app-user"))
            {
                navigate("/login")
            }else{
               setCurrentuser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
     }
     functt();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {

    const fetch = async () => {
      try {
         if(currentUser.isAvatarImageSet){
            const data= await axios.get(`${AllusersRoute}/${currentUser._id}`);
             console.log("d")
            console.log(data);
            setContacts(data.data);
         }else{
            navigate("/setAvatar");
         }
       
      } catch (error) {
        console.log(error);
      }
    };
    if(currentUser){
        fetch();
    }
   
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <div>
      <div className="bg-[#131324] w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <div className="bg-[#00000076] h-[85vh] w-[85vw] grid grid-cols-[25%_75%] md:grid-cols-[35%_65%]">
         
        {/* <div className="text-white"> */}
            
           <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {/* </div> */}

        {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
       

        </div>
      </div>
    </div>
  );
};


