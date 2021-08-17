import React, { useState,useEffect } from 'react';

const ChatRoom=({socket})=>{
    var key = localStorage.getItem();
    for(let i=0; i<localStorage.length;i++){
        if(key.num==i) {
            return(
                <div>{key._roomName}</div>
            )     
        } 
    }
    
}

export default ChatRoom;