import React,{useState} from 'react';
import Navi from '../../Components/Navi'
import Button from "../../Components/Button";
import BasicButtonGroup from "../../Components/SelectButton";
import './ShortWrite.css'
import Axios from 'axios';

function ShortWrite(number){
    const [shortReviewMovieTitle,setShortReviewMovieTitle] = useState('');
    const [shortReviewContent,setShortReviewContent] = useState('');
    const userID = localStorage.getItem('userID');
    const dateInst = new Date();
    var dateMonth = dateInst.getMonth() + 1;
    if(dateMonth<=9) dateMonth = "0" + dateMonth;

    var dateDay = dateInst.getDate();
    if(dateDay<10) dateDay = "0" + dateDay; 
    const yyyy = dateInst.getFullYear().toString();

    var date = yyyy + "-" + dateMonth + "-" + dateDay;
    console.log(date);
    const submitShortReview = () =>{
        console.log('실행중')
        Axios.post('http://localhost:3002/shortsubmit',{
            title:shortReviewMovieTitle,
            content:shortReviewContent,
            id:userID,
            date:date
        }).then((res)=>{
            if(res.data.success){
                alert('작성 완료')
            }
            else{
                console.log('오류')
            }
        })
    }
    const getMovieTitle = (e) =>{
        const movietitle = e.target.value;
        setShortReviewMovieTitle(movietitle);
        console.log(movietitle);
    }

    const getContent = (e) =>{
        const content = e.target.value;
        setShortReviewContent(content);
        console.log(content);
    }
    return(
        <>
            <div className="Write_main">
                <div className="select-button-wrap">
                    <BasicButtonGroup className="button-group" num={-1}></BasicButtonGroup>
                </div>
                <div className="form-wrap">
                    <form onSubmit={submitShortReview}>
                        <input className="movietitle-input" type='text' placeholder='영화 제목' onChange={getMovieTitle}/>
                        <p className="inst"> “........”에 대한 한 줄 리뷰를 작성하세요.</p>
                        <div classname="text-wrap">
                            <textarea className="text-input" placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다." onChange={getContent}></textarea>
                            <div className="button-wrap">
                                <Button id="shortWriteBtn" className="submit-button" size ="lg" type="submit">저장</Button>
                            </div>
                        </div>
                    </form>
                    <input className="keyword-input" type='text' placeholder='#'/>
                    <input className="check-box" type="checkbox" value="spoiler"></input>
                    <a className="check-inst">스포일러</a>
                </div>
            </div>
        </>
    )
    
}
export default ShortWrite;