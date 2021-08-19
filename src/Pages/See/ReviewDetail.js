import React, { Component } from 'react';
import './ReviewDetail.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillBackspaceReverseFill, BsFillPersonFill} from "react-icons/bs";


class ReviewDetail extends Component {
  state = {
    isLoading: true,
    review: [],
    like: false
  };

  //reviewID로 리뷰 가져오기
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
  render () {
    const {location} = this.props;
    return (
      <div className="ReviewDetail_container">
        <div className="review_content">
          <h3 className="review_title">{location.state.title}</h3>
          <hr className="line"></hr>
          <div className="review_text_box">
            <p className="review_text">{location.state.content}</p>
          </div>
          <div>
            <p><BsFillPersonFill/>  {location.state.writer}</p>
            <button className="like_but"><FaHeart/>  {location.state.likeC}</button>
            {/* <p><FaEye/>  {location.state.viewC}</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewDetail;