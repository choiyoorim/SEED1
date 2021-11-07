import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Subscribe.css';
function Subscribe(props) {
  const [Subscribed, setSubscribed] = useState(false);
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const userID = localStorage.getItem('userID');
  const writerID = localStorage.getItem('writerID');

  useEffect(() => {

    Axios.post('http://localhost:3002/subscribe/subscribeNumber', {writerID}).then(
      (response) => {
        if(response.data.success){
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('구독자 수 정보를 받아오지 못했습니다.');
        }
      }
    );

    Axios.post('http://localhost:3002/subscribe/subscribed', {userID, writerID}).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('정보를 받아오지 못했습니다.');
        }
        console.log(Subscribed);
      }
    );
  }, []);

  const onSubscribe = () => {
    let subscribedVariable = {
      userID: userID,
      writerID: writerID,
    };
    if(Subscribed) {  //이미 구독 중인 경우 구독 취소
      Axios.post('http://localhost:3002/subscribe/unSubscribe', subscribedVariable).then(
        (response) => {
          if(response.data.success) {
            setSubscribed(!Subscribed);
          } else {
            alert('구독 취소 실패');
          }
        }
      );
    } else {  //구독중이 아닌 경우 구독
      Axios.post('http://localhost:3002/subscribe/Subscribe', subscribedVariable).then(
        (response) => {
          if(response.data.success) {
            setSubscribed(!Subscribed);
          } else {
            alert('구독 실패');
          }
        }
      );
    }
  };

  return (
    <div className="subscribe_container" style={{display: (userID === writerID) ? 'none' : 'block' }} >
      <span className="subscribeNumber">구독자  {subscribeNumber}명</span>
      <button className="subscribe_button"
        style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#ffbb00'}`}} 
        onClick={onSubscribe}>
         {Subscribed ? '구독중' : '구독'} 
      </button>
    </div>
  );
}

export default Subscribe;