import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import '../Components/Navi.css';
import '../Components/color.css';
import user from '../Components/img/googleLogin.png';
import Axios from 'axios';

function Navi() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () =>setSidebar(!sidebar);

  const localUsername = localStorage.getItem('userNickname');

  const logout = () =>{
    localStorage.removeItem('userID')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userNickname')
    window.location.replace("/login")


    Axios.get('http://localhost:3002/user/logout')

  }



  return (
    <div class="main_container">
      <div class="navi_wrapper">
        {/* 아이콘 컬러 전체 변경 기능 */}
        <IconContext.Provider value={{ color: 'var(--seed-yelow)', size: '20px' }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div>
            <h1 class="logo">Seed Logo</h1>
            <ul class="menu">
              <li><Link to="/see">See</Link></li>
              <li><Link to="/like">Like</Link></li>
              <li><Link to="/mypage">MyPage</Link></li>
            </ul>
            <div class = "user">
              <p id = "user_name">{localUsername}</p>
              <img id = "user_img" src={user} width="40" height="40"/>
            </div>
          </div>
        

          {/* 사이드바 */}
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSidebar}>
            <div class="navbar-toggle">
              <Link to="#" className="close-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            </div>
            <div class="nav_user_info">
              <img id = "sideBar_user_img" src={user} width="50" height="50"/>
              <div className="sideBar_user_name"><p>seed님</p></div>
              <span className ="sideBar_sub user-info"><p>구독자 23</p></span>
              <span className="sideBar_like user-info"><p>좋아요 103</p></span>
            </div>
            <div class="nav_sidebar_menu">
              <ul className="nav-menu-items" onClick={showSidebar}>
                {/* SideBar를 순서대로 담기*/}
                {SideBar.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span><p class="itemtitle">{item.title}</p></span>
                      </Link>
                    </li>
                    );
                  })}
              </ul>
            </div>
            <div class="nav_bottom">
              <button onClick={logout}>로그아웃</button>
            </div>
          </nav>
        </IconContext.Provider>
        
      </div>
    </div>
    
  );
}
export default Navi;