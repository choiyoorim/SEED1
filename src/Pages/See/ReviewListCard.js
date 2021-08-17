import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./MovieCard.css";
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";

function ReviewListCard({ id, writer, title, likeC, viewC, content, pubDate, movieCode }) {
    return (
      <tr className="reviewlist_card" id="reviewlist_card_outside">
        <Link
          to={{
            pathname: `/review/${id}`,
            state: {
              id,
              writer,
              title,
              likeC,
              viewC,
              content,
              pubDate,
              movieCode
            }
          }}
        >
          <td>{id}</td>
          <td className="reviewlist_title">{title}</td>
          <td className="reviewlist_writer"><BsFillPersonFill/> {writer}</td>
          <td className="reviewlist_likeC"><FaHeart/> {likeC}</td>
          <td className="reviewlist_viewC"><FaEye/> {viewC}</td>
        </Link>
      </tr>
    );
  }
  
  ReviewListCard.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    pubDate: PropTypes.number.isRequired,
    movieCode: PropTypes.number.isRequired
  };

export default ReviewListCard;