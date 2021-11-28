import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import './Subscribe.css';
function Modification(props) {
  const [isModification, setIsModification] = useState(false);
  const reviewID = localStorage.getItem('seeReviewID');

  useEffect(() => {

    Axios.post('http://localhost:3002/modification/isModification', {reviewID}).then(
      (response) => {
        if(response.data.success){
            console.log(response.data.modificated);
            setIsModification(response.data.modificated);
        
        } else {
            alert('수정 여부 정보를 받아오지 못했습니다.');
        }
      }
    );
  }, []);

  return (
    <div className="modification">
        <p 
        style={{display: isModification ? 'block' : 'none' ,
        color:'white'}}>수정됨</p>
    </div>
  );
}

export default Modification;