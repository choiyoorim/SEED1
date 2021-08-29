import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./ChatHome.css";
import socketIOClient from "socket.io-client";
import ChatRoom from "../../Components/ChatRoom/ChatRoom";
import Loading from "./Loading";

//userName이 ID input태그에 value값으로 들어가게 하고 readonly로 수정!
const userName = localStorage.getItem('userName');

const ChatHome = ({ userName, roomName, setUserName, setRoomName }) => {
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };
  localStorage.setItem("userName", userName);
  localStorage.setItem("roomName", roomName);
  return (
    <div className="Home-container">
      <label className="room" htmlFor="roomName">Room</label>
      <input name="roomName" onChange={handleRoomNameChange}></input>
      <label className="chat_label" htmlFor="id">ID</label>
      <input name="id" onChange={handleUserNameChange}></input>
      <button className="Join-button">
        <Link to="/chat">새로운 방 만들기</Link>
      </button>
      <button className="Join-button">
        <Link to="/chat">채팅 참여하기</Link>
      </button>
    </div>
  );
};
export default ChatHome;