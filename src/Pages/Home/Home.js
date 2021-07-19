import React from 'react';
import Navi from '../../Components/Navi'
import { Link } from 'react-router-dom';
import './Home.css';

function Home(){
    return (
        <>
        <Navi></Navi>
        <br/><br/><br/>
        <p id="logo">Seed</p>
        <p id="logoIntro">Best Movie Review Application</p>
        <p id="joinmsg">Are you not a member yet?</p>
        <Link to="/signup"><div id="joinLink">Join <br/> to <br/> SEED</div></Link>
        <hr id="line"></hr>
        <div id="frame">
            <p id="introtitle">Why SEED?</p>
        <div class="intro" id="intro1">
             <h2 class="introtitle">다함께 즐기세요.</h2>
             <p class="intropara">Mobile, Desktop 등 다양한 디바이스에서 리뷰하고 공유하세요.</p>
        </div>

        <div class="intro" id="intro2">
             <h2 class="introtitle">글을 저장하세요.</h2>
             <p class="intropara" id="para2">마음에 드는 리뷰가 있다면 간편하게 저장하고, 오프라인에서도 확인하세요.</p>
             <br/>
        </div>

        <div class="intro" id="intro3">
             <h2 class="introtitle">전용 프로필을 사용하세요.</h2>
             <p class="intropara" id="para3">리뷰를 작성하고 공유하며 영감을 함께 나눠보세요.</p>
        </div>
        </div>
        </>
        );
}
export default Home;