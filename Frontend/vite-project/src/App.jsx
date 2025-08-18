import React, { useState, useEffect } from "react";
import socket from "./Utility.js";

const App = () => {
  const [CurrentId, setCurrentId] = useState("")
  const [text, settext] = useState("")
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
  console.log("UserInfo",UserInfo);
  
  useEffect(() => {
      socket.on("connect", () => {
      setUserInfo((prev) => ({
        ...prev,
        id: socket.id,
      }));
      setCurrentId(socket.id)
    });

    socket.on("Welcome", (msg) => {
      console.log(msg);
    });

   socket.on("ReceiveMessage" , ({ id, text }) => {
  setUserInfo((prev) => ({
    ...prev,
    message: [...prev.message, { text, id }]
  }));
});



    return () => {
      socket.off("connect");
      socket.off("Welcome");
      socket.off("ReceiveMessage");
    };
  }, []);

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
    setUserInfo((prev)=> ({...prev , text : ""}))

  };

  return (
    <div>
      <div className="bg-red-500 px-3 py-2">
        User Connected with id {UserInfo.id}
      </div>

      <div className="flex">
        <form onSubmit={SendMessage} className="w-1/2">
          <input
            type="text"
            value={UserInfo.text}
            onChange={({ target }) => HandleChanges("text", target.value)}
            className="form-input"
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
        </form>

        {/* Messages area */}
        <div className="border w-1/2 m-2 rounded-lg p-2">
       
          {UserInfo.message.map((msg, index) => (
          <div key={index} className={`p-1 border-b ${msg.id == CurrentId ? "text-red-500":"text-green-500 text-end"}`}>
              <div className="text-xs flex flex-col">
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
