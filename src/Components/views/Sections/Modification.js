import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Modification.css'
import {withRouter} from 'react-router-dom';

function Modification(props, history) {
  const [isModification, setIsModification] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userID = user.data.result[0].userID;
  // const reviewID = localStorage.getItem('seeReviewID');
  // const isUser = (localStorage.getItem('writerID') === userID);

  const reviewID = props.reviewID;
  const isUser = (props.writerID === userID);

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

  const onMofify = () =>{
    localStorage.setItem('edit', 'true');
    history.push("/write");
  };

  return (
    <div className="modification">
        <p 
          style={{display: isModification ? 'block' : 'none' ,
          color:'white'}}>수정됨</p>
        <button className="modification_button"
          style={{display: isUser ? 'block' : 'none'}}
          onClick={onMofify}>수정</button>
    </div>
    
  );
}

export default withRouter(Modification);