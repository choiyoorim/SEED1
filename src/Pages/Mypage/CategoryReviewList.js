import React, { Component, useEffect, useState }from "react";
import Axios from 'axios';
import {ReviewCategory} from '../reviewCategory';
import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import {withRouter} from 'react-router-dom';



function CategoryReviewList({history}) {
    const id= localStorage.getItem('userID');
    const [categoryMenu, setCategoryMenu] = useState(false);
    const [background, setBackground] = useState();
    const [color, setColor] = useState();
    const openCategory = () => {
        setCategoryMenu(true);
        setBackground('var(--seed-yelow)');
        setColor('var(--seed-text-black)')
    };
    const closeCategory = () => {
        setCategoryMenu(false);
        setBackground();
        setColor();
    };

    const [type, setType] = useState();
    const [writeInfo, setWriteInfo] = useState();
    const [IsShort, setIsShort] = useState(false);

    const [movieReviewList, setReviewList] = useState([]);
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
    
    const openReviewList = (categoryType) =>{
        setType(categoryType);
        if(categoryType==="short"){
            shortReviewList();
            setWriteInfo("Short 리뷰");
            setIsShort(true);
        }
        if(categoryType==="express"){
            expressReviewList();
            setWriteInfo("Express 리뷰");
            setIsShort(false);
        }
        
    };

    const edit=(res, categoryType)=>{
        localStorage.setItem('reviewID', res);
        localStorage.setItem('edit', true);

        if(categoryType==="short"){
            history.push("/shortWrite");
        }
        if(categoryType==="express"){
            history.push("/write");
        }
    };
    

    return (
        <div className="user_write">
            <h3 onMouseOver={openCategory} onMouseOut={closeCategory} style={{background: background, color: color}}>Seeds</h3>
            <div>
                <ul className={categoryMenu ? 'category active' : 'category'} onMouseOver={openCategory} onMouseOut={closeCategory}>
                    <li className="category-text">최신 글</li>
                    {ReviewCategory.map((item, index)=>{
                        return (
                            <li className={item.cName} onClick={()=>openReviewList(item.type)}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
            
            <div className="write_info">
                    <div className="myseeds">
                        <span className="Wmovie">영화</span>
                        <span className="Wtitle">{writeInfo}</span>
                        <span className="Wnum">조회수</span>
                        <span className="Wdate">작성일</span>
                    </div>
            
                    <form id="written">
                        <ul>
                        {movieReviewList.map((list) => {
                            return (
                            <li className={type} onClick={() => edit(list.reviewID, type)}>
                                <span className="Wmovie">{list.title}</span>
                                <span className={IsShort ? "Wtitle" : "Wtitle extend"}>{list.reviewTitle}
                                    <span className={IsShort ? "Wcontent" :"Wcontent extend"}>{list.reviewContent}</span>
                                </span>
                                <span className="Wnum">{list.viewCount}</span>
                                <span className="Wdate">{list.preparationDate}</span>
                            </li>
                        ) })}
                    </ul>
                </form>
            </div>
        </div>

    );
    
}

export default withRouter(CategoryReviewList);