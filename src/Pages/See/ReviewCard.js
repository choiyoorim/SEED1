import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./ReviewCard.css";
import {FaHeart} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import {withRouter} from 'react-router-dom';


function ReviewCard({ history, id, writer, title, likeC, viewC, content }) {
  
  const user = JSON.parse(sessionStorage.getItem('user'));
  const auth = user.data.auth;
  // const auth= localStorage.getItem('auth');

  const isAuth = ()=>{
    if(!auth){
      alert("영화 리뷰를 자세히 보고 싶다면 seed에 가입해야합니다.");
      //window.location.replace("/");
      history.push('/see');
    }
    localStorage.setItem('edit', false);
  }

    return (
      <div className="review_card" id="review_card_outside" onClick={isAuth}>
        <Link 
          to={{
            pathname: `/review/${id}`,
            state: {
              writer,
              title,
              likeC,
              viewC,
              content
            }
          }}
        >
          <div className="review__data">
            <h3 className="review__title">{title}</h3>
            <p className="review__writer"><BsFillPersonFill/>  {writer}</p>
            <p className="review_likeC"><FaHeart/>  {likeC}</p>
          </div>
        </Link>
      </div>
    );
  }
  
  ReviewCard.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  };

export default withRouter(ReviewCard);