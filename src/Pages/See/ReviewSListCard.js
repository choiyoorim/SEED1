import React from 'react';
import './ReviewListCard.css'
import PropTypes from "prop-types";

function ReviewSListCard({ id, writer, title, likeC, viewC, content, pubDate, movieCode }) {
    return (
      <table className="reviewlist_card" id="reviewlist_card_outside">
          <td className="mdNo">{id}</td>
          <td className="mdTitle">{title}</td>
          <td className="mdWriter"> {writer}</td>
          <td className="mdLike">{likeC}</td>
          {/* <td className="reviewlist_viewC"> {viewC}</td> */}
      </table>
    );
  }
  
  ReviewSListCard.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    pubDate: PropTypes.number.isRequired,
    movieCode: PropTypes.number.isRequired
  };

export default ReviewSListCard;