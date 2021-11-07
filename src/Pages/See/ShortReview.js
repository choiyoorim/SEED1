import React, { Component, useEffect,useState } from 'react';
import './RList.css';
import Navi from '../../Components/Navi';
import ShortReviewList from './ShortReviewList';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
//import { Link } from 'react-router-dom';

const ShortReview = () => {
    const [movieContent,setMovieContent] = useState({
      reviewID:'',
      userID:'',
      movieCODE:'',
      reviewContent:'',
      preparationDate:''
    })

    const [viewContent,setViewContent] = useState([]);

    useEffect(()=>{
      Axios.get('http://localhost:3002/getshortreview').then((response)=>{
        console.log(response.data)
        setViewContent(response.data);
        console.log(response.data[0].movieCODE);
      })
    },[]);

      return (
        <div>
          {/*
          <div className="RList">
            <div className="reviewInfo">
              <div>제목</div>
              <div>조회수</div>
              <div>작성자</div>
              <div className="acenter">날짜</div>
            </div>
            {list ? list.map( (el, key) => {
              return(
                <div className="list_grid list_data" key={key}>
                  <div>{el.title}</div>
                  <div></div>
                  <div className="acenter">{el.data.slice(0, 10)}</div>
                </div>
              )
            })
              : null}
          </div>
          */}
          <h1 className="titleofreview">Short Review List</h1>
          <table className="reviewInfoTable">
            <tbody>
              <tr>
                <td id="no">No.</td>
                <td id="movie">MovieTitle</td>
                <td id="content">Content</td>
                <td id="writer">Writer</td>
                <td id="date">Date</td>
              </tr>
              <br></br>

              {viewContent.map((data)=> {
                return React.createElement(ShortReviewList,{numId: data.reviewID, writer:data.userID, movieCode: data.title,content:data.reviewContent, date: data.preparationDate});
              })}
            </tbody>
          </table>
          <div className="button-wrap">
            <Link to="/expressreview"><Button>Express Review 더보기</Button></Link>
          </div>
        </div>
      );
    }

  export default ShortReview;