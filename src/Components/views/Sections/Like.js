import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Like.css';
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";

function Like(props) {
  const [Liked, setLiked] = useState(false);
  const [LikedCount, setLikedCount] = useState(0);
  const userID = localStorage.getItem('userID');
  const reviewID = props.reviewID;

  useEffect(() => {
    //좋아요 수 가져오기
    Axios.post('//localhost:3002/api/see/review/reviewE/like/count', {reviewID}).then(
      (res) => {
        setLikedCount(res.data.length);
      }
    );

    //좋아요 유무 확인
    Axios.post('//localhost:3002/api/see/review/reviewE/like/check', {userID, reviewID}).then(
      (res) => {
        if (res.data.length > 0) {
          setLiked(true);
        }
      }
    );
  }, []);

  const onLiked = () => {
    //좋아요가 true이면 좋아요 삭제
    if(Liked){
      Axios.post('//localhost:3002/api/see/review/reviewE/like/delete', {userID, reviewID}).then(
        (res) => {
          setLiked(false);
          setLikedCount(LikedCount - 1) //좋아요 버튼 눌러도 새로고침 x -> 변경해줘야함
        }
      );
    }else{ // 좋아요가 false이면 좋아요 생성
      Axios.post('//localhost:3002/api/see/review/reviewE/like/create', {userID, reviewID}).then(
        (res) => {
          setLiked(true);
          setLikedCount(LikedCount + 1) //좋아요 버튼 눌러도 새로고침 x -> 변경해줘야함
        }
      );
    }
  };

  return (
    <div className="subscribe_container">
      <span className="subscribeNumber"> 좋아요 {LikedCount}</span>
      <button className="subscribe_button"
        onClick={onLiked}>
         {Liked ? <FaHeart style={{color : `#ffbb00`}}/> : <FiHeart style={{color : `#ffbb00`}}/>} 
      </button>
    </div>
  );
}

export default Like;