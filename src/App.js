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
import SignUp from './Pages/SignUp/Signup';
import MemberInfo from './Pages/Memberinfo/MemberInfo';
import Withdrawal from './Pages/Withdrawal/Withdrawal';
import ContactUs from './Pages/Email/ContactUs';
import MovieDetail from './Pages/See/MovieDetail';
import ReviewDetail from './Pages/See/ReviewDetail';
import ShortReview from './Pages/See/ShortReview';
import ReviewSelect from './Pages/ReviewSelect/ReviewSelect';
import ExpressReview from './Pages/See/ExpressReview';
// import ChatHome from './Pages/Chat/ChatHome';
// import Chat from './Pages/Chat/Chat';
import Moviegram from './Pages/Moviegram/Moviegram';
import ExpressReviewContent from './Pages/See/ExpressReviewContent';
import NotFound from './Pages/NotFound';

const App = () =>{
  return(
    <>
    <BrowserRouter>
        <Navi/>
        <Switch>
          <Route exact path ="/" component={Home}/>
          <Route path="/see" component={See}/>
          <Route path="/like" component={Like}/>
          <Route path="/mypage" component={Mypage}/>
          <Route path="/shortwrite" component={ShortWrite}/>
          <Route path="/write" component={Write}/>
          <Route path="/find" component={Find} />
          <Route path="/shortreview" component={ShortReview}/>
          <Route path="/expressreview" component={ExpressReview}/>
          <Route path="/expressreviewcontent/:id" component={ExpressReviewContent}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/memberinfo" component={MemberInfo} />
          <Route path="/withdrawal" component={Withdrawal} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/login" component={Login}/>
          <Route path="/movie/:id" component={MovieDetail}/>
          <Route path="/review/:id" component={ReviewDetail}/>
          <Route path="/reviewSelect" component={ReviewSelect}/>
          {/* <Route path="/chathome">
            <ChatHome 
              userName={userName} 
              roomName={roomName}
              setUserName={setUserName}
              setRoomName={setRoomName}
            />
          </Route>
          <Route path="/chat" exact render={()=> <Chat userName={userName} roomName={roomName} />}>
          </Route> */}
          <Route path="/moviegram" component={Moviegram}/>
          <Route component={NotFound}/>
        </Switch>
        
    </BrowserRouter>
    </>
  );
}

export default App;

