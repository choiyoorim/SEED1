import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IoNotifications } from "react-icons/io5";
import './Notification.css';

function Notification() {
    const [notilist, setNotiList] = useState([]);
    const [userID, setUserID] = useState('');
    const [notiDisplay, setNotiDisplay] = useState(false);
    const [auth, setAuth] = useState(false);

    const showNoti = () =>{
        setNotiDisplay(!notiDisplay)

        //소식 정보 가져옴
        Axios.post('http://localhost:3002/notification', {
            userID: userID
        }).then((response) => {
            if(response.data.list){
                setNotiList(response.data.noti);
            } else{
                setNotiList([{message: "표시할 소식이 없습니다."}]);
            }
        }
    )}


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user){
            setUserID(user.data.result[0].userID);
            setAuth(user.data.auth);
        }
    }, []);


{/* 구독자가 글 올리면 알림, 좋아요 받으면 알림, 댓글 알림, 대댓글 알림 */}
  return (
<div>
    {auth? <IoNotifications id="noti-icon" onClick={showNoti}/> : <></>}
    <div className='noti-componemt' style={{display: `${notiDisplay ? "block": "none"}`}}>
            <div>
                <ul className='noti-list'>
                    {notilist.map((item, index) =>{
                        return (
                            <li>{item.message}</li>
                        )
                    })}
                </ul>
            </div>

        {/* 열람한 소식인지 확인: 열람한 소식인 경우 흐리게 표시됨 */}
        </div>
    );
</div>
)}
export default Notification;