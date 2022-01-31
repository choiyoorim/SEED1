import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';
import '../Components/Navi.css';
import '../Components/color.css';
import userimg from '../Components/img/googleLogin.png';
import Axios from 'axios';
import { MicNone } from '@material-ui/icons';
import {withRouter} from 'react-router-dom';
import Notification from '../Components/views/Notification/Notification';


function Navi({history}) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () =>setSidebar(!sidebar);
  const closeSidebar = () =>setSidebar(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [nickname, setNickname] = useState('');
  const [auth, setAuth] = useState(false);
  // const nickname = localStorage.getItem('userNickname');  
  // const auth= localStorage.getItem('auth');


  const logout = () =>{
    //인증 JWT
    // localStorage.removeItem('token')

    // localStorage.removeItem('auth')
    // localStorage.removeItem('userID')
    // localStorage.removeItem('userEmail')
    // localStorage.removeItem('userNickname')
    // localStorage.removeItem('userName')
    localStorage.removeItem('reviewID')
    localStorage.removeItem('edit')
    localStorage.removeItem('writerID')
    
    //session에서 user정보 삭제
    sessionStorage.removeItem('user');

    Axios.get('http://localhost:3002/user/logout')
    window.location.replace("/")
    alert('로그아웃되었습니다.');
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

  useEffect(()=>{
    //sessionStorage에 user가 있는 경우 정보 가져오기
    if(user){
      setNickname(user.data.result[0].userNickname);
      setAuth(user.data.auth);
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
              <li><Link to="/see" className="menus"> SEE </Link></li>
              <li onClick={isAuth}><Link to="/like" className="menus"> LIKE </Link></li>
              <li onClick={isAuth}><Link to="/mypage"  className="menus"> MY PAGE </Link></li>
              <li onClick={isAuth}><Link to="/moviegram"  className="menus"> MOVIEGRAM </Link></li>
            </ul>
            <div class = "user">
              <p id = "user_name" onClick={moveInfo}>{nickname}</p>
              {auth? <img id = "user_img" src={userimg} width="40" height="40"/> 
              : <button id="user_login" onClick={moveLogin}>Login</button>}
              {/* <button id="user_login" onClick={showNoti}>소식</button> */}
            </div>
            
          </div>

          <Notification/>

          {/* 사이드바 */}
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} onClick={showSidebar}>
            <div class="navbar-toggle">
              <Link to="#" className="close-bars">
              <AiIcons.AiOutlineClose onClick={closeSidebar} />
            </Link>
            </div>
            <div class="nav_user_info">
              <img id = "sideBar_user_img" src={userimg} width="50" height="50"/>
              <div className="sideBar_user_name"><p>{nickname}</p></div>
              <span className ="sideBar_sub user-info"><p>구독자 <b>23</b></p></span>
              <span className="sideBar_like user-info"><p>좋아요 <b>103</b></p></span>
            </div>
            <div class="nav_sidebar_menu">
              <ul className="nav-menu-items">
                {/* SideBar를 순서대로 담기*/}
                {SideBar.map((item, index) => {
                  return (
                    <li onClick={isAuth} key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span><p class="itemtitle" id="sideitemtitle">{item.title}</p></span>
                      </Link>
                    </li>
                    );
                  })}
              </ul>
            </div>
            <div class="nav_bottom">
              {auth? <button id = "logoutBtn" onClick={logout}>로그아웃</button>
              : <button id = "logoutBtn" onClick={moveLogin}>로그인</button>}
            </div>
          </nav>
        </IconContext.Provider>

      </div>
    </div>

  );
}
export default withRouter(Navi);
