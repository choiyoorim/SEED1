import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./ReviewCard.css";
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";

function ReviewList({ id, writer, title, likeC, viewC, content }) {
    return (
      <div className="review_card" id="review_card_outside">
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
            <p className="review_viewC"><FaEye/>  {viewC}</p>
          </div>
        </Link>
      </div>
    );
  }
  
  ReviewList.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  };

export default ReviewList;