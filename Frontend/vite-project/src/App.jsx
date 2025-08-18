import React, { useState, useEffect } from "react";
import socket from "./Utility.js";
import Message from "./Components/Message.jsx";
import SideBar from "./Components/SideBar.jsx";

const App = () => {
  const [CurrentId, setCurrentId] = useState("")
  const [Join, setJoin] = useState("")
  const [text, settext] = useState("")
  const [Users, setUsers] = useState([])
  const [UserInfo, setUserInfo] = useState({
    id: "",
    name: "",
    text: "",
    message: [
      {
        text : "" , 
        id : ""
      }],
  });

 
  

  useEffect(() => {
      socket.on("connect", () => {
      setUserInfo((prev) => ({
        ...prev,
        id: socket.id,
      }));
      setCurrentId(socket.id)
      
    });

    socket.on("Welcome", (msg) => {
      setJoin(msg)
    });

   socket.on("ReceiveMessage" , ({ id, text }) => {
  setUserInfo((prev) => ({
    ...prev,
    message: [...prev.message, { text, id }]
  }));
});

  socket.on("Users", (users)=>{
    setUsers(users)
  })



    return () => {
      socket.off("connect");
      socket.off("Welcome");
      socket.off("ReceiveMessage");
    };
  }, []);

  useEffect(() => {
  if (!Join) return; 

  const timer = setTimeout(() => {
    setJoin("");
  }, 3000);

  return () => clearTimeout(timer); 
}, [Join]);

  const HandleChanges = (key , value)=>{
    setUserInfo((prev)=>({
      ...prev,
      [key] : value
    }))
  }

  const SendMessage = (e) => {
    e.preventDefault();
    if (UserInfo.text.trim() === "") return;

    // send to server
    socket.emit("Message", {id: socket.id, text: UserInfo.text});
    // setUserInfo((prev)=> ({...prev , text : ""}))

  };

  return (
    <div className="font-urbanist">
      <div className="bg-red-500 px-3 py-2">
        User Connected with id {UserInfo.id}
      </div>

      <div className="grid grid-cols-6">
        <div className=" col-span-2 border h-[93vh] ">
          <SideBar
            Users={Users.filter((item)=> item!=CurrentId)} 
            CurrentId={CurrentId}
          />
        </div>
        <div className=" col-span-4 border ">
          <Message
            UserInfo={UserInfo}
            CurrentId={CurrentId}
            Join ={Join}
          />
          <div>
            <form onSubmit={SendMessage}   className="flex items-center justify-between  border gap-1 ">
                <div className="border">
                  <div  className={`size-10 rounded-full  bg-red-200 border `}></div>
                </div>
                <input
                  type="text"
                  value={UserInfo.text}
                  onChange={({ target }) => HandleChanges("text", target.value)}
                  className="form-input"
                  />
                <button type="submit" className="btn-primary p-3  text-lg">
                  Send
                </button>
            </form>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default App;



  // <div className="relative border w-1/2 h-[90vh] m-2 rounded-lg ">
       
  //          
  //           
  //       </div>