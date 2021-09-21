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
    const [categoryMenu, setCategoryMenu] = useState(false);
    const [background, setBackground] = useState();
    const [color, setColor] = useState();
    const[display, setDisplay] = useState('none');


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

    const openCategory = () => {
        if(!categoryMenu){
            setBackground('var(--seed-yelow)');
            setColor('var(--seed-text-black)')
        } else{
            setBackground();
            setColor();
        }
        setCategoryMenu(!categoryMenu);
    };

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

    const opsnExpressList = () =>{
        expressReviewList();
        setWriteInfo("Express 리뷰");
        setIsShort(false);
        setType('express');
    }
    
    const openReviewList = (categoryType) =>{
        if(categoryType==="writing"){
            setDisplay('block')
            openShortList();
        }else{
            setDisplay('none')
        }
    };

    const edit=(res, categoryType)=>{
        localStorage.setItem('reviewID', res);
        localStorage.setItem('edit', 'true');

        if(categoryType==="short"){
            history.push("/shortWrite");
        }
        if(categoryType==="express"){
            history.push("/write");
        }
    };

    return (
        <div className="user_write">
            <h3 onClick={openCategory} style={{background: background, color: color}}>Seeds</h3>
            <div className="categoryMenu">
                <ul className={categoryMenu ? 'category active' : 'category'}>
                    {/* <li className="category-text" onClick={()=>setDisplay('none')}>최신 글</li> */}
                    {ReviewCategory.map((item, index)=>{
                        return (
                            <li className="rootCategory" onClick={()=>openReviewList(item.type)}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="shortOrExpress" style={{display: display}}>
                <span className="shortList" onClick={openShortList}>short</span>
                <span className="expressList" onClick={opsnExpressList}>express</span>
            </div>
            <div className="write_info" style={{display: display}}>
                <div className="myseeds">
                    <span className="Wmovie">영화</span>
                    <span className="Wtitle">{writeInfo}</span>
                    <span className="Wdate">작성일</span>
                    <span className="Wnum">조회수</span>
                </div>
                <form id="written">
                    <ReviewPosts posts={displayReviews} type={type} IsShort={IsShort} edit={edit}/>

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