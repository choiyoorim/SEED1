import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./ChatHome.css";
import socketIOClient from "socket.io-client";
import ChatRoom from "../../Components/ChatRoom/ChatRoom";
import Loading from "./Loading";

const ChatHome = ({ userName, roomName, setUserName, setRoomName }) => {
  let idx = 0;
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
    //roomArr = [{num:idx,_roomName:roomName}]
    idx++;
  };

  localStorage.setItem("userName", userName);
  //localStorage.setItem("roomNameList", roomArr);

  const [currentSocket, setCurrentSocket] = useState();

  useEffect(()=>{
      setCurrentSocket(socketIOClient("http://localhost:3002"));
  },[]);

  if(currentSocket){
          currentSocket.on("connect",()=>{

          });
    }

  return (
    <div className="Home-container">


      <label className="room" htmlFor="roomName">Room</label>
      <input name="roomName" onChange={handleRoomNameChange}></input>
      <label htmlFor="id">ID</label>
      <input name="id" onChange={handleUserNameChange}></input>
      <button className="Join-button">
        <Link to="/chat">새로운 방 만들기</Link>
      </button>
      <button className="Join-button">
        <Link to="/chat">채팅 참여하기</Link>
      </button>
    {currentSocket ? (
                <>
                    <ChatRoom socket={currentSocket}></ChatRoom>
                </>
            ) : (
                <Loading></Loading>
            )}
    </div>
  );
};

export default ChatHome;