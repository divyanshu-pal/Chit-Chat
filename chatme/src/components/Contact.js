import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
 
   
  useEffect(() => {
    
    const fetch=async()=>{
          try {
            const data =  JSON.parse(
                localStorage.getItem('chat-app-user')
              );
              setCurrentUserName(data.username);
              setcurrentUserImage(data.avatarImage);
          } catch (error) {
             console.log(error);
          }
    }

     fetch();
  }, []);
 
//   useEffect(() => {
//     if (currentUser) {
//       setCurrentUserName(currentUser.name);
//       setcurrentUserImage(currentUser.avatarImage);
//     }
//   }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {/* {currentUserName && currentUserImage &&( */}

      <div className="grid grid-rows-[10%_75%_15%] bg-[#080420] overflow-hidden">
        <div className="flex items-center justify-center gap-4">
          <img src={Logo} alt="logo" className="h-8" />
          <h1 className="text-white uppercase">chatme</h1>
        </div>

        <div className="flex flex-col items-center overflow-auto gap-3 custom-scrollbar">
          {contacts.map((contact, index) => {
            console.log(contact);
            return (
              <div
                key={contact._id}
                className={`bg-[#ffffff34] min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] p-2 flex gap-4 items-center transition duration-500 ease-in-out ${
                  index === currentSelected ? "bg-[#9a86f3]" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="h-[3rem]">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt={`Avatar ${index}`}
                    className="h-[3rem]"
                  />
                </div>
                <div className="text-white">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}

          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 0.2rem;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #ffffff39;
              width: 0.1rem;
              border-radius: 1rem;
            }
          `}</style>
        </div>
        <div className="bg-[#0d0d30] flex justify-center items-center">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt={`Avatar`}
            className="h-16 max-w-full"
          />
        </div>
        <div className="text-white font-medium">
          <h1>{currentUserName}</h1>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Contact;
