import React, { useState } from 'react';
import  '../Mypage/Mypage.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';


function ReviewECard({ history, id, writer, title, likeC, viewC, content, pubDate, movieCode, movieTitle }) {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const auth = user.data.auth;
  // const auth= localStorage.getItem('auth');
  //localStorage.setItem('writerID', writer);
  //console.log(writer);

  const isAuth = ()=>{
    if(!auth){
      alert("영화 리뷰를 자세히 보고 싶다면 seed에 가입해야합니다.");
      history.push('/see');
    }
    localStorage.setItem('edit', false);
  }

    return (
      <table className = "mypageToDetail" onClick={isAuth}>
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
            <td className="Wmovie">{movieTitle}</td>
            <td className="Wtitle">{title}
                <span className="Wcontent">{content}</span>
            </td>
            <td className="Wdate">{pubDate}</td>
            <td className="Wnum">{viewC}</td>
          </Link>
            
        
      </table>
    );
  }
  
  ReviewECard.propTypes = {
    id: PropTypes.number.isRequired,
    writer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likeC: PropTypes.number.isRequired,
    viewC: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    pubDate: PropTypes.number.isRequired,
    movieCode: PropTypes.number.isRequired
  };

export default withRouter(ReviewECard);