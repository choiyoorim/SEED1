import './App.css';
import React, { Component } from 'react';
import './Components/Navi.css'


import{
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';

import See from './Pages/See/See'
import Write from './Pages/See/Write';
import Like from './Pages/Like/Like';
import Mypage from './Pages/Mypage/Mypage';
import Home from './Pages/Home/Home';
import ShortWrite from './Pages/See/ShortWrite';
import Find from './Components/Find/Find';
import Navi from './Components/Navi';

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
