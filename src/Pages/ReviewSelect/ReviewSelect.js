import React from 'react';
import Navi from '../../Components/Navi'
import { Link } from 'react-router-dom';
import { ReviewCategory } from '../reviewCategory';
import './ReviewSelect.css';

function ReviewSelect(){
    return (
        <>
        <Navi></Navi>
        <div id="space"/>
        <div id="bigBox">
        <div id="ReviewSelectBox">
            <h2 id="rsTitle">어떤 리뷰를 쓰고 싶으세요?</h2>
            <div class="nav_sidebar_menu">
              <ul className="nav-menu-items" id="navul">
                {ReviewCategory.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span><p class="itemtitle" id="itemtitlep">{item.title}</p></span>
                      </Link>
                    </li>
                    );
                  })}
              </ul>
            </div>
        </div>
        </div>
        </>
    );
}
export default ReviewSelect;
