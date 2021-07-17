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
import Find from './Components/Find/Find';
import Navi from './Components/Navi';
import RList from './Pages/See/RList';
import MList from './Pages/See/MList';

const App = () =>{
  return(
    <>
    <HashRouter>
        <Navi></Navi>
        <Route exact path ="/" component={Home}/>
        <Route exact path="/see" component={See}/>
        <Route exact path="/write" component={Write}/>
        <Route exact path="/like" component={Like}/>
        <Route exact path="/mypage" component={Mypage}/>
        <Route exact path="/shortwrite" component={ShortWrite}/>
        <Route exact path="/find" component={Find} />
        <Route exact path="/RList" component={RList}/>
        <Route exact path="/MList" component={MList}/>
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
