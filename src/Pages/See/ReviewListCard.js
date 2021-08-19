import React from 'react';
import './ReviewListCard.css'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import {withRouter} from 'react-router-dom';


function ReviewListCard({ history, id, writer, title, likeC, viewC, content, pubDate, movieCode }) {

  const auth= localStorage.getItem('auth');

  const isAuth = ()=>{
    if(!auth){
      alert("영화 리뷰를 자세히 보고 싶다면 seed에 가입해야합니다.");
      //window.location.replace("/");
      history.push('/see');
    }
    localStorage.setItem('edit', false);
  }

    return (
      <table className="reviewlist_card" id="reviewlist_card_outside" onClick={isAuth}>
          <td className="mdNo">{id}</td>
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
            <td className="mdTitle">{title}</td>
          </Link>
          <td className="mdWriter"> {writer}</td>
          <td className="mdLike">{likeC}</td>
          {/* <td className="reviewlist_viewC"> {viewC}</td> */}
        
      </table>
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

export default withRouter(ReviewListCard);