import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Subscribe(props) {
  const [Subscribed, setSubscribed] = useState(false);
  const userID = localStorage.getItem('userID');
  const writerID = localStorage.getItem('writerID');

  useEffect(() => {

    Axios.post('http://localhost:3002/subscribed', {userID, writerID}).then(
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

  return (
    <div>
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
        onClick
      >
        {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscribe;