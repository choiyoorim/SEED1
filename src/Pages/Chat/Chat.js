import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import socketIOClient from "socket.io-client";
import ChatInput from "../../Components/ChatInput/ChatInput";
import ChatLog from "../../Components/ChatLog/ChatLog";
import ChatRoom from '../../Components/ChatRoom/ChatRoom';
import Loading from "./Loading";
import './Chat.css';

const ChattingBlock = styled.div`
    margin:auto;
    margin-top:500px;
    background-color:lightblue;
    text-align:center;
    width:200px;
`
const Chat = ({roomName,userName}) =>{
    const myInfo = {
        roomName : roomName ? roomName : localStorage.getItem("roomName"),
        userName : userName ? userName : localStorage.getItem("userName"),
    };

    const [currentSocket, setCurrentSocket] = useState();

    useEffect(()=>{
        setCurrentSocket(socketIOClient("http://localhost:3002"));
    },[]);

    if(currentSocket){
            currentSocket.on("connect",()=>{
                currentSocket.emit("join",myInfo);
            });
        }


    return(
        <ChattingBlock>
            {currentSocket ? (
                <>
                    <ChatLog socket={currentSocket}></ChatLog>
                    <ChatInput userName={userName} socket={currentSocket}></ChatInput>
                </>
            ) : (
                <Loading></Loading>
            )}
        </ChattingBlock>
    );
};

export default Chat;