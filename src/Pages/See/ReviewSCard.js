import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./ReviewCard.css";
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";

function ReviewSCard({ id, writer, likeC, viewC, content }) {
    return (
      <div className="review_card" id="review_card_outside">
          <div className="review__data">
            <h3 className="review__title">{content}</h3>
            <p className="review__writer"><BsFillPersonFill/>  {writer}</p>
            <p className="review_likeC"><FaHeart/>  {likeC}</p>
            {/* <p className="review_viewC"><FaEye/>  {viewC}</p> */}
          </div>
      </div>
    );
  }
  
  ReviewSCard.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  };

export default ReviewSCard;