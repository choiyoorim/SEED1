import { Movie } from "@material-ui/icons";
import Axios from 'axios';
import React from "react";
import './Mypage.css';
import ReviewECard from './ReivewECard';


const ReviewPosts = ({ posts }) => {
  return (
    <>
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
              movieCode: list.movieCODE,
              movieTitle: list.title
            }
        )
      ))}
      </div>
    </>
  );

};
export default ReviewPosts;