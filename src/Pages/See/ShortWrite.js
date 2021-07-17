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
                    <BasicButtonGroup className="button-group" num={-1}></BasicButtonGroup>
                </div>
                <input className="movie-search" type='text' placeholder='Search'/>
                <div className="form-wrap">
                    <p className="inst"> “........”에 대한 한 줄 리뷰를 작성하세요.</p>
                    <div classname="text-wrap">
                        <textarea className="text-input" placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다."></textarea>
                        <div className="button-wrap">
                            <Button className="submit-button" size ="lg">저장</Button>
                        </div>
                    </div>
                    <input className="keyword-input" type='text' placeholder='#'/>
                    <input className="check-box" type="checkbox" value="spoiler"></input>
                    <a className="check-inst">스포일러</a>
                </div>
            </div>
        </>
    )
    
}

export default ShortWrite;