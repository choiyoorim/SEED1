import React from 'react';
import Navi from '../../Components/Navi'
import Button from "../../Components/Button";
import BasicButtonGroup from "../../Components/SelectButton";
import './ShortWrite.css'

function ShortWrite(number){
    return(
        <>
            <div className="Write_main">
                <div className="select-button-wrap">
                    <BasicButtonGroup num={-1}></BasicButtonGroup>
                </div>
                <input className="movie-search" type='text' placeholder='Movie Search'/>
                <div className="form-wrap">
                    <h2 id="shortlogo">SHORT REVIEW</h2>
                    <p className="inst" id="shortmsg"> <h2 id="movieName">"영화 이름" </h2>에 대한 한 줄 리뷰를 작성하세요.</p>
                    <textarea className="text-input" placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 통보 없이 삭제될 수 있습니다."></textarea>
                    <input className="keyword-input" type='text' placeholder='#'/><br/>
                    <input className="check-box" type="checkbox" value="spoiler"></input>
                    <a className="check-inst" id="warnmsg"> 스포일러가 될 수 있는 글을 포함하고 있습니다.</a>
                    <div className="button-wrap">
                        <Button className="save-button">임시저장</Button>
                        <Button className="submit-button" size ="md">등록</Button>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default ShortWrite;