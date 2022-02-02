import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { IoNotifications, IoRemoveCircleOutline } from "react-icons/io5";
import './Notification.css';

function Notification(props) {
    const [notilist, setNotiList] = useState([]);
    const [notiDisplay, setNotiDisplay] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const auth = props.auth;


    const showMessage = ()=>{
        setNotiDisplay(!notiDisplay)
        getNoti();
    }

    const getNoti = () =>{
        //소식 정보 가져옴
        Axios.post('http://localhost:3002/notification/get', {
            userID: props.user.userID
        }).then((response) => {
            if(response.data.list){
                setNotiList(response.data.noti);
            }
            setIsMessage(response.data.list);
        }
    )};

    const delMessage = (notID) =>{
        //소식 정보 삭제
        Axios.post('http://localhost:3002/notification/delete', {
            notID: notID
        }).then((response) => {
            if(!response.data.success){
                console.log("알림 메시지 삭제 중 에러")
            } else{
                getNoti();
            }
        }
    )};


    useEffect(() => {

    }, []);


{/* 구독자가 글 올리면 알림, 좋아요 받으면 알림, 댓글 알림, 대댓글 알림 */}
  return (
<div>
    {auth? <IoNotifications id="noti-icon" onClick={showMessage}/> : <></>}
    <div className='noti-componemt' style={{display: `${notiDisplay ? "block": "none"}`}}>
        { isMessage? 
            <ul className='noti-list'>
                {notilist.map((item, index) =>{
                    return (
                        <li key={index} id={item.notID}>  
                            <div>
                                <div className='meaasge'>{item.message}</div>
                                <div className='del-btn' onClick={()=>delMessage(item.notID)}><IoRemoveCircleOutline/></div>
                            </div>
                        </li>
                    )
                })}
                </ul>
                :
                <ul className='noti-list'>
                    <li>
                        <div>
                            <div className='no_meaasge'>표시할 메시지가 없습니다.</div>
                        </div>
                    </li>
                </ul>
            }

        {/* 열람한 소식인지 확인: 열람한 소식인 경우 흐리게 표시됨 */}
    </div>
    );
</div>
)}
export default Notification;