import React, { Component, useEffect, useState }from "react";
import Axios from 'axios';
import {ReviewCategory} from '../reviewCategory';

import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import {withRouter} from 'react-router-dom';
import ReviewPosts from "./ReviewPosts";
import ReactPaginate from "react-paginate";


function CategoryReviewList({history}) {
    const id= localStorage.getItem('userID');
    const[shortOrExpressDisplay, setShortOrExpressDisplay] = useState('none');


    const [type, setType] = useState();
    const [writeInfo, setWriteInfo] = useState();
    const [IsShort, setIsShort] = useState(false);


    const [movieReviewList, setReviewList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const reviewPerPage = 5;
    const pagesVisited = pageNumber * reviewPerPage;
    const displayReviews = movieReviewList
        .slice(pagesVisited, pagesVisited+reviewPerPage);
    const pageCount = Math.ceil(movieReviewList.length / reviewPerPage);
    const changePage =({selected}) =>{
        setPageNumber(selected);
    }

    const shortReviewList = () =>{
        Axios.post("http://localhost:3002/reviewS/list", {
            userID: id
          }).then((response)=>{
          setReviewList(response.data);
        });
    };
    const expressReviewList = () =>{
        Axios.post("http://localhost:3002/reviewE/list", {
            userID: id
          }).then((response)=>{
          setReviewList(response.data);
        });
    };

    const openShortList = ()=>{
        shortReviewList();
        setWriteInfo("Short 리뷰");
        setIsShort(true);
        setType('short');
    }

    const openExpressList = () =>{
        expressReviewList();
        setWriteInfo("Express 리뷰");
        setIsShort(false);
        setType('express');
    }

    const openCardList = () =>{
        //expressReviewList();
        setWriteInfo("카드 리뷰");
        setIsShort(false);
        setType('card');
    }

    const openVedioList = () =>{
        //expressReviewList();
        setWriteInfo("영상 리뷰");
        setIsShort(false);
        setType('card');
    }
    
    const openReviewList = (categoryType) =>{
        if(categoryType==="writing"){
            setShortOrExpressDisplay('block')
            openShortList();
        } else if(categoryType==="card"){
            setShortOrExpressDisplay('none')
            openCardList();
        } else if(categoryType==="video"){
            setShortOrExpressDisplay('none')
            openVedioList();
        } else{
            setShortOrExpressDisplay('none')
        }
    };

    // const edit=(reviewid, categoryType)=>{
    //     localStorage.setItem('reviewID', reviewid);
    //     localStorage.setItem('edit', 'true');

    //     if(categoryType==="short"){
    //         history.push("/shortWrite");
    //     }
    //     else if(categoryType==="express"){
    //         history.push("/write");
    //     }
    // };


    useEffect(()=>{
        openShortList();
    }, []);

    return (
        <div className="user_write">
            {/* <h3 onClick={openCategory} style={{background: background, color: color}}>Seeds</h3> */}
            <div className="categoryMenu">
                <ul className='category'>
                    {ReviewCategory.map((item, index)=>{
                        return (
                            <li className="rootCategory" onClick={()=>openReviewList(item.type)}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="shortOrExpress" style={{display: shortOrExpressDisplay}}>
                <span className="shortList" onClick={openShortList}>short</span>
                <span className="expressList" onClick={openExpressList}>express</span>
            </div>
            <div className="write_info">
                <div className="myseeds">
                    <span className="Wmovie">영화</span>
                    <span className="Wtitle">{writeInfo}</span>
                    <span className="Wdate">작성일</span>
                    <span className="Wnum">조회수</span>
                </div>
                <form id="written">
                    <ReviewPosts posts={displayReviews}/>

                    <ReactPaginate
                        previousLabel={"이전"}
                        nextLabel={"다음"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}/>
                </form>
            </div>
        </div>

    );
    
}

export default withRouter(CategoryReviewList);