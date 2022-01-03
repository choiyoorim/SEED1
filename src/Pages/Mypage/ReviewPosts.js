import { Movie } from "@material-ui/icons";
import Axios from 'axios';
import React from "react";
import './Mypage.css';
import ReviewECard from './ReivewECard';

const getmovieCode = (title) =>{
  Axios.post("http://localhost:3002/getMovieCode", {
      title: title
    }).then((response)=>{
      return response.data;
  });
};

const ReviewPosts = ({ posts, loading }) => {
    return (
        <>
      { loading &&
        <div> loading... </div>
      }
      <div className="writtenUl">
        { posts.map(list=>(
          React.createElement(ReviewECard,
            {
              key: list.reviewID,
              id: list.reviewID,
              writer: list.userID,
              title: list.reviewTitle,
              likeC: list.likeCount,
              viewC: list.viewCount,
              content: list.reviewContent,
              pubDate: list.date,
              movieCode: getmovieCode(list.title),
              movieTitle: list.title
              //list에 movieCode가 없음
            }
        )

        ))}
      </div>
      </>
      );

};
export default ReviewPosts;