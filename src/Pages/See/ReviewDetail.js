import React, { Component } from 'react';
import './ReviewDetail.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {FaEye} from "react-icons/fa";
import {FiCheckSquare} from "react-icons/fi";
import {BsFillBackspaceReverseFill, BsFillPersonFill} from "react-icons/bs";
import Subscribe from '../../Components/views/Sections/Subscribe';


class ReviewDetail extends Component {
  state = {
    isLoading: true,
    review: [],
    like: false,
    isLike: false,
    writer: ""
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
    const { isLike, isSubscribe } = this.state;
    //writerID 로컬 저장소에 저장
    localStorage.setItem('writerID', location.state.writer);
    return (
      <div className="ReviewDetail_container">
        <div className="review_content">
          <h3 className="review_title">{location.state.title}</h3>
          <hr className="line"></hr>
          <div className="review_text_box">
            <p className="review_text">{location.state.content}</p>
          </div>
          <div className="subLikeBut_container">
            <div className="userSub_box">
              <p><BsFillPersonFill/>  {this.state.writer = location.state.writer}</p>
              <Subscribe/>
            </div>
              
            <div className="Like_box">
              <button className="like_but" onClick={()=>this.toggleLike()}>
                {isLike?<FaHeart style={{ color: '#ffbb00', fontSize: '20px'}}/>:<FiHeart style={{fontSize: '20px'}}/>}  
              </button>
              <p>{location.state.likeC}</p>
            </div>
            
            {/* <p><FaEye/>  {location.state.viewC}</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewDetail;