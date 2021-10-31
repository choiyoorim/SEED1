import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import '../Components/Navi.css';
import '../Components/color.css';
import user from '../Components/img/googleLogin.png';
import Axios from 'axios';
import { MicNone } from '@material-ui/icons';
import {withRouter} from 'react-router-dom';

function Navi({history}) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () =>setSidebar(!sidebar);
  const closeSidebar = () =>setSidebar(false);

  const nickname = localStorage.getItem('userNickname');  
  const auth= localStorage.getItem('auth');


  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    localStorage.removeItem('userID')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userNickname')
    localStorage.removeItem('userName')
    localStorage.removeItem('reviewID')
    localStorage.removeItem('edit')
    localStorage.removeItem('writerID')


    Axios.get('http://localhost:3002/user/logout')
    window.location.replace("/")
    //history.push('/login');
  };

  const moveLogin = () =>{
    history.push('/login');
  };

  const moveHome = () =>{
    history.push('/');
  };

  const moveInfo = () =>{
    history.push('/memberinfo');
  };

  const[visibility, setVisibility] = useState('visible');

  useEffect(()=>{
    if(auth){
      setVisibility('hidden')
    }else{
      setVisibility('visible')
    }
  });

  const isAuth=()=>{
    if(!auth){
      moveHome();
      alert("seed를 이용하기 전에 로그인 해야합니다.");
    }
    localStorage.setItem('edit', false);
  };

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
          <div onClick={closeSidebar}>
            <h1 class="logo" onClick={moveHome}>Seed.</h1>
            <ul class="menu">
              <li><Link to="/see" className="menus">See</Link></li>
              <li onClick={isAuth}><Link to="/like" className="menus">Like</Link></li>
              <li onClick={isAuth}><Link to="/mypage"  className="menus">MyPage</Link></li>
            </ul>
            <div class = "user">
              <p id = "user_name" onClick={moveInfo}>{nickname}</p>
              <button id = "user_login" style={{visibility: visibility}} onClick={moveLogin}>로그인</button>
              <img id = "user_img" src={user} width="40" height="40"/>
            </div>
          </div>


          {/* 사이드바 */}
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSidebar}>
            <div class="navbar-toggle">
              <Link to="#" className="close-bars">
              <AiIcons.AiOutlineClose onClick={closeSidebar} />
            </Link>
            </div>
            <div class="nav_user_info">
              <img id = "sideBar_user_img" src={user} width="50" height="50"/>
              <div className="sideBar_user_name"><p>{nickname}</p></div>
              <span className ="sideBar_sub user-info"><p>구독자 23</p></span>
              <span className="sideBar_like user-info"><p>좋아요 103</p></span>
            </div>
            <div class="nav_sidebar_menu">
              <ul className="nav-menu-items">
                {/* SideBar를 순서대로 담기*/}
                {SideBar.map((item, index) => {
                  return (
                    <li onClick={isAuth} key={index} className={item.cName}>
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
              <button id = "logoutBtn" onClick={logout}>로그아웃</button>
            </div>
          </nav>
        </IconContext.Provider>

      </div>
    </div>

  );
}
export default withRouter(Navi);
