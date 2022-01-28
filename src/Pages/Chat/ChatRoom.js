import React,{useEffect,useState} from 'react';
import './ChatRoom.css';
import Button from '../../Components/Button';
import socketIOClient from "socket.io-client";
import ChatLog from '../../Components/ChatLog/ChatLog';
import ChatInput from '../../Components/ChatInput/ChatInput';

function ChatRoom({roomName,userName}) {
    const myInfo = {
        roomName: roomName ? roomName : localStorage.getItem("roomName"),
        userName: userName ? userName : localStorage.getItem('userNickname')
    }
    const [currentSocket,setCurrentSocket] = useState();
    const userNickname = localStorage.getItem('userNickname');
    


    
useEffect(()=>{
        setCurrentSocket(socketIOClient('localhost:3002/chat'));
    },[]);

    

    return (
        <p>
            It's <time dateTime={currentSocket}>{currentSocket}</time>
        </p>
    );
}

export default ChatRoom;