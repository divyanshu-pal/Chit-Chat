
import React, { useEffect, useState } from "react";
import axios from "axios";
 import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRouts";
import loader from '../assets/loader.gif'
 
export default function SetAvatar() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const api = `https://api.multiavatar.com/4645646`;

  const [avatar, setAvatar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user"))
      navigate("/login");
  }, [navigate]);

  

 
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      try {
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`,
            { responseType: 'arraybuffer' }  // Ensures proper handling of binary data
          );
          const base64 = btoa(
            new Uint8Array(response.data)
              .reduce((acc, byte) => acc + String.fromCharCode(byte), '')
          );
          data.push(base64);
        }
        setAvatar(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch avatars:', error);
        setLoading(false); // make sure to set loading false even if there is an error
      }
    };
  
    fetchData();
  }, []);

  
  



 
  

  // Correct useEffect for redirect
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);


  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      console.log("d")
      const userdata= localStorage.getItem("chat-app-user");
      console.log(userdata);
      const user = JSON.parse(userdata);
      
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar],
      });
         
      // console.log(data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  // if (loading) return <p>Loading...</p>; // Handle loading state

  return (
    <>
     {loading ?(
      <img src={loader} alt="loader"/>
     ):(
    <div className="flex flex-col justify-center items-center min-h-screen bg-orange-800">
    {/* flex flex-col justify-center items-center min-h-screen bg-orange-800 */}
      <div className=" mt-4">
        <h1 className="text-2xl font-bold text-white">Pick an Avatar as your profile picture</h1>
      </div>

      <div className="flex flex-wrap justify-center items-center">
      {avatar.map((avatar, index) => (
        <div 
          key={index}
          className={`w-48 h-48 p-5 ${
            selectedAvatar === index ? "border-4 border-blue-500" : ""
          }`}
          onClick={() => setSelectedAvatar(index)}
        >
          <img
            src={`data:image/svg+xml;base64,${avatar}`}
            alt={`Avatar ${index}`}
            className="max-w-full max-h-full" // Ensure image fits within the container
          />
        </div>
      ))}
    </div>

      <div className="p-2 rounded-md text-white bg-black">
      <button onClick={setProfilePicture}>Set as Profile Picture</button>
      </div>
      <ToastContainer />
    </div>
     )}
    </>
  );
}
