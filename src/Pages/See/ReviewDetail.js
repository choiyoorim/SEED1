import React, { Component } from 'react';
import './ReviewDetail.css';
import axios from 'axios';
import Button from "../../Components/Button"
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {FaEye} from "react-icons/fa";
import {FiCheckSquare} from "react-icons/fi";
import {BsFillBackspaceReverseFill, BsFillPersonFill} from "react-icons/bs";
import Subscribe from '../../Components/views/Sections/Subscribe';
import Modification from '../../Components/views/Sections/Modification';

const userID = localStorage.getItem('userID');

class ReviewDetail extends Component {
  state = {
    isLoading: true,
    review: [],
    like: false
  };

  getReview = async () => {
    const movieCODE = this.props.match.params.id;
    await axios.post('//localhost:3002/api/see/movie/review', {movieCODE})
    .then((res)=>{
        this.setState({ review : res.data, isLoading: false });
    });
  };

  
  componentDidMount(){
    const { location, history } = this.props;
    if(location.state === undefined) {
        history.push("/");
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
    const {location} = this.props;
    //writerID 로컬 저장소에 저장
    //seeReviewID는 ReviewDetail페이지에서 보고있는 리뷰 ID
    localStorage.setItem('writerID', location.state.writer);
    localStorage.setItem('seeReviewID', location.state.id);

    return (
      <div className="ReviewDetail_container">
        <div className="review_content">
          <h3 className="review_title">{location.state.title}</h3>
          <hr className="line"></hr>
          <div className="subLikeBut_container">
            <span className="userSub_box">
              <p><BsFillPersonFill/>  {this.state.writer = location.state.writer}</p>
            </span>
            
            <Subscribe/>

            {location.state.title === undefined ? <></> : <Modification/>}

            {(location.state.writer === userID && location.state.title === undefined) ? 
            <div className="delete-button" onClick={()=>this.deleteShortReview(location.state.id)}>
            <Button size="sm" type="delete">삭제</Button>
          </div>
          : <></>}
            

            {/* 좋아요버튼 */}

            {/* 조회수 */}
            {/* <p><FaEye/>  {location.state.viewC}</p> */}
          </div>
          <div className="review_text_box">
            <p className="review_text">{location.state.content}</p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default ReviewDetail;