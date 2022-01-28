import React,{useRef,useState} from 'react';
import socketIOClient from 'socket.io-client';
import './ChatInput.css';
import Button from '../Button';
const ChatInput = ({userName,socket}) => {
    const [chatMessage, setChatMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("onSend",{
            userName: userName ? userName : localStorage.getItem("userNickname"),
            msg:chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
        });
        setChatMessage("");
    };

    const onChatMessageChange = (e) => {
        setChatMessage(e.target.value);
    };

    return (
        <div className="chat-form-container">
            <form id="chat-form" onSubmit={handleSubmit}>
                    <input 
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        onChange={onChatMessageChange}
                    />
                    <Button className="msg-btn">Send</Button>
                </form>
        </div>
    )
}

export default ChatInput;