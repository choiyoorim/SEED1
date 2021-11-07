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
      구독자수. {subscribeNumber}
      <button
        style={{
          backgroundColor: `${Subscribed ? '#AAAAAA' : '#ffbb00'}`,
          borderRadius: '5px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={onSubscribe}
      >
         {Subscribed ? 'Subscribed' : 'Subscribe'} 
      </button>
    </div>
  );
}

export default Subscribe;