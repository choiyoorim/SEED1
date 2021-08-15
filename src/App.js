import './App.css';
import React, { Component, useEffect, useState}from "react";
import './Components/Navi.css';
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";


import See from './Pages/See/SeeMain'
import Write from './Pages/See/Write';
import Like from './Pages/Like/Like';
import Mypage from './Pages/Mypage/Mypage';
import Home from './Pages/Home/Home';
import ShortWrite from './Pages/See/ShortWrite';
import Navi from './Components/Navi';
import Find from './Pages/Find/Find';
import Login from './Components/Login/Login';
import RList from './Pages/See/RList';
import MList from './Pages/See/MList';
import SignUp from './Pages/SignUp/Signup';
import MemberInfo from './Pages/Memberinfo/MemberInfo';
import ContactUs from './Pages/Email/ContactUs';

const App = () =>{

  return(
    <>
    <BrowserRouter>
        <Navi/>
        <Route exact path ="/" component={Home}/>
        <Route path="/see" component={See}/>
        <Route path="/write" component={Write}/>
        <Route path="/like" component={Like}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/shortwrite" component={ShortWrite}/>
        <Route path="/find" component={Find} />
        <Route path="/login" component={Login} />
        <Route path="/rlist" component={RList}/>
        <Route path="/mlist" component={MList}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/memberinfo" component={MemberInfo} />
        <Route path="/contactUs" component={ContactUs} />
    </BrowserRouter>
    </>
  );
}

export default App;

