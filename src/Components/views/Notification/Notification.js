import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Notification.css';
function Notification() {

    {/* 구독자가 글 올리면 알림, 좋아요 받으면 알림, 댓글 알림, 대댓글 알림 */}

  return (
    <div className='noti-componemt'>
        <div>
            <ul className='noti-list'>
                <li>oo님이 ~글에 공감했습니다.</li>
                <li>oo님이 구독했습니다.</li>
                <li>oo님이 ~글에 댓글을 남겼습니다.</li>
            </ul>
        </div>

    {/* 열람한 소식인지 확인: 열람한 소식인 경우 흐리게 표시됨 */}
    </div>
  );
}

export default Notification;