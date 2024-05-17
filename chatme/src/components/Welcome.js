import React, { useState, useEffect } from "react";

import Robot from "../assets/robot.gif";
const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(async () => {
    const fetch = async () => {
      try {
        setUserName(
          await JSON.parse(localStorage.getItem("chat-app-user")).username
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <img src={Robot} alt="" className='h-[20rem]'/>
      <h1 >
        Welcome, <span className='text-[#4e0eff]'>{userName}! </span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
