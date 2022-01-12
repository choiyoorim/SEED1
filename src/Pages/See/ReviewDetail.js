import React, { Component, useState } from 'react';
import './ReviewDetail.css';
import axios from 'axios';
import Button from "../../Components/Button";
import {FaEye} from "react-icons/fa";
import {FiCheckSquare} from "react-icons/fi";
import {BsFillBackspaceReverseFill, BsFillPersonFill} from "react-icons/bs";
import Subscribe from '../../Components/views/Sections/Subscribe';
import Like from '../../Components/views/Sections/Like';
import Modification from '../../Components/views/Sections/Modification';

const user = JSON.parse(sessionStorage.getItem('user'));
// const userID = localStorage.getItem('userID');

class ReviewDetail extends Component {
  state = {
    review: []
  };

  //리뷰E 가져오기
  getReview = async () => {
    const reviewID = this.props.match.params.id;
    axios.post('//localhost:3002/api/see/review/reviewE/info', {reviewID})
    .then((res)=>{
        this.setState({ review : res.data[0] });
    });
  };

  componentDidMount(){
    const { location, history } = this.props;
    if(location.state === undefined) {
        history.push("/");
    }
    //sessionStorage에 user가 있는 경우 정보 가져오기
    if(user){
      this.setState({userID: user.data.result[0].userID});
    }
    this.getReview();
  }

  deleteShortReview (reviewID) {
    if(window.confirm("정말로 삭제하시겠습니까?")){
      axios.post('http://localhost:3002/short/delete',{
        reviewID:reviewID
      }).then((res)=>{
        if(res.data.success){
            alert("삭제되었습니다.")
            window.location.href = '/mypage';
        } else{
            alert('제출하는 과정에서 오류가 발생했습니다.');
            console.log('오류');
        }
      })
    } else{
      alert("삭제 요청이 취소되었습니다.");
    }
  }

  render () {
    const { review } = this.state;
    // //writerID 로컬 저장소에 저장
    // //seeReviewID는 ReviewDetail페이지에서 보고있는 리뷰 ID
    // localStorage.setItem('writerID', location.writer);
    // localStorage.setItem('seeReviewID', review.id);

    return (
      <div className="ReviewDetail_container">
        <div className="review_content">
          <h3 className="review_title">{review.reviewTitle}</h3>
          <hr className="line"></hr>
          <div className="subLikeBut_container">
            <span className="userSub_box">
              <p><BsFillPersonFill/>  {review.userID}</p>
            </span>
            
            <Subscribe/>

            <div style={{display: (user === review.userID) ? 'none' : 'block'}}>
              <Like reviewID = {review.reviewID}/>
            </div>

            {review.title === undefined ? <></> : <Modification/>}

            {(review.writer === user && review.title === undefined) ? 
            <div className="delete-button" onClick={()=>this.deleteShortReview(review.id)}>
            <Button size="sm" type="delete">삭제</Button>
          </div>
          : <></>}
            

            {/* 조회수 */}
            {/* <p><FaEye/>  {location.state.viewC}</p> */}
          </div>
          <div className="review_text_box">
            <p className="review_text">{review.reviewContent}</p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default ReviewDetail;