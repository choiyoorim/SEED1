import React, { Component } from 'react';
import './ReviewDetail.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {FaEye} from "react-icons/fa";
import {BsFillBackspaceReverseFill, BsFillPersonFill} from "react-icons/bs";


class ReviewDetail extends Component {
  state = {
    isLoading: true,
    review: [],
    like: false,
    isLike: false,
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

  toggleLike = () => {
    this.state.isLike ?
    this.setState({
      isLike: false,
    })
    :
    this.setState({
      isLike: true,
    });
}


  render () {
    const {location} = this.props;
    const { isLike } = this.state;
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
            <div>
              <button className="like_but" onClick={()=>this.toggleLike()}>
                {isLike?<FaHeart style={{ color: '#ffbb00', fontSize: '20px'}}/>:<FiHeart style={{fontSize: '20px'}}/>}  
              </button>
              {location.state.likeC}
            </div>
            
            {/* <p><FaEye/>  {location.state.viewC}</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewDetail;