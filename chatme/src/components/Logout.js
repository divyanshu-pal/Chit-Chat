import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

import axios from "axios";
import { logoutRoute } from "../utils/APIRouts";

const Logout = () => {

    const navigate = useNavigate();
    const handleClick = async () => {
      const id = await JSON.parse(
        localStorage.getItem('chat-app-user')
      )._id;
      const data = await axios.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
    }
};
  return (
    <div className='flex justify-center items-center p-[0.5rem] bg-[#9a86f3] border-none cursor-pointer' >
         
         <button onClick={handleClick } >
              <BiPowerOff />
         </button>

    </div>
  )
}

export default Logout;