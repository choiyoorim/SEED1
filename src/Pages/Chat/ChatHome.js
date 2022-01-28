import Button from '../../Components/Button';
import React from 'react';
import './ChatHome.css';
import { Link } from 'react-router-dom';

function ChatHome({userName,roomName,setUserName,setRoomName}) {
    var userName = localStorage.getItem('user');
    setUserName(userName);
    const handleRoomNameChange = (e) =>{
        setRoomName(e.target.value);
    }
    localStorage.setItem(roomName,"roomName");
    //const [roomList,setRoomList] = useState([]);
    //const id = localStorage.getItem('userID');
    const roomList=[
        {
            roomName:"1",
            roomInfo:"재밌는 영화 이야기해요"
        },
        {
            roomName:"2",
            roomInfo:"재밌는 영화 이야기해요"
        },
        {
            roomName:"3",
            roomInfo:"재밌는 영화 이야기해요"
        },
        {
            roomName:"4",
            roomInfo:"재밌는 영화 이야기해요"
        },
        {
            roomName:"5",
            roomInfo:"재밌는 영화 이야기해요"
        },
        {
            roomName:"6",
            roomInfo:"재밌는 영화 이야기해요"
        },
    ]
    return (
        <div class="container">
            <header class="header">
                <h1>Chat</h1>
            </header>
            <main class="room-main">
                <div class="roomList-container">
                    {/*배열(데이터베이스) 매핑해서 여기다가 룸리스트 출력*/}
                    {/*<ul>
                        {roomList.map((list)=>{
                            return(
                                <li className={list.roomNum}>
                                    <span id="roomName">{list.roomName}</span>
                                    <span id="roomInfo">{list.roomInfo}</span>
                                    <Button className="enterRoom">Enter</Button>
                                </li>
                            )
                        })}
                    </ul>*/}
                    <form className="roomListPrint">
                        <ul>
                            {roomList.map((list)=>{
                                return(
                                    <li>
                                        <span id="roomName">{list.roomName}</span>
                                        <span id="roomInfo">{list.roomInfo}</span>
                                        <div className="EnterRoom"><Button className="enterRoom">Enter</Button></div>
                                    </li>
                                )
                            })}
                        </ul>
                    </form>
                </div>
                <div class="newRoom-create-container">
                    {/*방 제목 및 한 줄 설명 작성하게끔 
                    입력 후에 데이터베이스에 저장해야함*/}
                    <form class="newRoom-info">
                        <li><h2>Room Name : </h2><input type="text" placeholder="roomname" onChange={handleRoomNameChange}></input></li>
                        <li><h2>Room Inst : </h2><input type="text" placeholder="roominfo"></input></li>   
                        <div className="enterNewRoom">
                            <Button>
                                <Link to="/chatroom">Enter</Link>
                            </Button>
                        </div>               
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ChatHome;