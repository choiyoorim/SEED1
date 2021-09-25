import React from "react";
import './Mypage.css';

const ReviewPosts = ({ posts, loading, type, IsShort, edit }) => {
    return (
        <>
      { loading &&
        <div> loading... </div>
      }
      <ul className="writtenUl">
        { posts.map(list=>(
          <li key={list.reviewID} onClick={() => edit(list.reviewID, type)} className={type}>
            <span className="Wmovie">{list.title}</span>
            <span className={IsShort ? "Wtitle" : "Wtitle extend"}>{list.reviewTitle}
                <span className={IsShort ? "Wcontent" :"Wcontent extend"}>{list.reviewContent}</span>
            </span>
            <span className="Wdate">{list.date}</span>
            <span className="Wnum">{list.viewCount}</span>
        </li>
        ))}
      </ul>
      </>
      );

};
export default ReviewPosts;