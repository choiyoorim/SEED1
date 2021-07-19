import './App.css';
import React, { Component } from 'react';
import './Components/Navi.css'


import{
  HashRouter,
  Switch,
  Route,
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
import RList from './Pages/See/RList';
import MList from './Pages/See/MList';
import SignUp from './Pages/SignUp/Signup';


const App = () =>{
  return(
    <>
    <HashRouter>
        <Navi></Navi>
        <Route exact path ="/" component={Home}/>
        <Route path="/see" component={See}/>
        <Route path="/write" component={Write}/>
        <Route path="/like" component={Like}/>
        <Route path="/mypage" component={Mypage}/>
        <Route path="/shortwrite" component={ShortWrite}/>
        <Route path="/find" component={Find} />
        <Route path="/rlist" component={RList}/>
        <Route path="/mlist" component={MList}/>
        <Route path="/signup" component={SignUp}/>
    </HashRouter>
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
