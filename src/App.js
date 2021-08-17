import './App.css';
import React, { Component } from 'react';
import './Components/Navi.css'
import { useState } from 'react';

import{
  HashRouter,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import See from './Pages/See/SeeMain'
import Write from './Pages/See/Write';
import Like from './Pages/Like/Like';
import Mypage from './Pages/Mypage/Mypage';
import Home from './Pages/Home/Home';
import ShortWrite from './Pages/See/ShortWrite';
import Navi from './Components/Navi';
import Find from './Pages/Find/Find';
import Login from './Components/Login/Login';
import ShortReview from './Pages/See/ShortReview'
import ExpressReview from './Pages/See/ExpressReview';
import MList from './Pages/See/MList';
import SignUp from './Pages/SignUp/Signup';
import MemberInfo from './Pages/Memberinfo/MemberInfo';
import ChatHome from './Pages/Chat/ChatHome';
import Chat from './Pages/Chat/Chat';
import ExpressReviewContent from './Pages/See/ExpressReviewContent';

const App = () =>{
  const [userName,setUserName] = useState();
  const [roomName,setRoomName] = useState();
  return(
    <>
    <BrowserRouter>
        <Navi></Navi>
        <Route exact path ="/" component={Home}/>
        <Route path="/see" component={See}/>
        <Route path="/write" component={Write}/>
        <Route path="/like" component={Like}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/shortwrite" component={ShortWrite}/>
        <Route path="/find" component={Find} />
        <Route path="/shortreview" component={ShortReview}/>
        <Route path="/expressreview" component={ExpressReview}/>
        <Route path="/expressreviewcontent/:id" component={ExpressReviewContent}/>
        <Route path="/mlist" component={MList}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/memberinfo" component={MemberInfo} />
        <Route path="/login" component={Login}/>
        <Route path="/chathome">
          <ChatHome 
            userName={userName} 
            roomName={roomName}
            setUserName={setUserName}
            setRoomName={setRoomName}
          />
        </Route>
        <Route path="/chat" exact render={()=> <Chat userName={userName} roomName={roomName} />}>
        </Route>    
    </BrowserRouter>
    </>
  );
}

// class App extends Component{
//   render(){
//     return(
//       <div className="App">
//         <Navi></Navi>
//       </div>
//     );
//   }
// }

export default App;
