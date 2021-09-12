import React, {useEffect, useState }from "react";
import Button from "../../Components/Button";
import BasicButtonGroup from "../../Components/SelectButton";
import './ShortWrite.css'
import Axios from 'axios';

function ShortWrite(){
    const [shortReviewMovieTitle,setShortReviewMovieTitle] = useState('');
    const [shortReviewContent,setShortReviewContent] = useState('');
    const [isFirst, setIsFirst] = useState(true);   //처음 작성 여부(처음이면 insert, 아니면 update)
    const [visibilityButton, setVisibilityButton] = useState('visible');
    const userID = localStorage.getItem('userID');
    const reviewID = localStorage.getItem('reviewID');
    const edit = localStorage.getItem('edit');
    const dateInst = new Date();
    var dateMonth = dateInst.getMonth() + 1;
    if(dateMonth<=9) dateMonth = "0" + dateMonth;

    var dateDay = dateInst.getDate();
    if(dateDay<10) dateDay = "0" + dateDay; 
    const yyyy = dateInst.getFullYear().toString();

    var date = yyyy + "-" + dateMonth + "-" + dateDay;
    const submitShortReview = () =>{
        if(isFirst){
                Axios.post('http://localhost:3002/shortsubmit',{
                title:shortReviewMovieTitle,
                content:shortReviewContent,
                id:userID,
                date:date
            }).then((res)=>{
                if(res.data.success){
                    alert('작성 완료');
                    //window.location.replace('/mypage');
                }
                else{
                    alert('제출하는 과정에서 오류가 발생했습니다.');
                    console.log('오류');
                }
            });
        }
        else{
            Axios.post('http://localhost:3002/shortsubmit/update',{
                content:shortReviewContent,
                reviewID:reviewID
            }).then((res)=>{
                // console.log(res);
                // console.log(res.data);
                // console.log(res.data.success);

                if(res.data.success){
                    setIsFirst(true);
                    alert('수정 완료');
                    // window.location.replace('/mypage');
                    window.location.href = '/mypage';
                } else{
                    alert('제출하는 과정에서 오류가 발생했습니다.');
                    console.log('오류');
                }
            });
        }
    };
    
    const getMovieTitle = (e) =>{
        const movietitle = e.target.value;
        setShortReviewMovieTitle(movietitle);
        console.log(movietitle);
    };

    const getContent = (e) =>{
        const content = e.target.value;
        setShortReviewContent(content);
        console.log(content);
    };

    useEffect(()=>{
        if(edit==='true'){
            Axios.post("http://localhost:3002/reviewS/edit", {
                reviewID: reviewID
            }).then((response)=>{
                setShortReviewMovieTitle(response.data[0].title)
                setShortReviewContent(response.data[0].reviewContent)
            })
            setIsFirst(false);
            setVisibilityButton('hidden');
            localStorage.setItem('edit', 'false');
        }
    },[]);

    return(
        <>
            <div className="Write_main">
            <div id="writeTopDiv">
                    <div className="select-button-wrap">
                        <BasicButtonGroup num={-1}></BasicButtonGroup>
                    </div>
                        <p id="writeLogo">Seed.</p>
                    </div>
                <div className="form-wrap">
                    <form onSubmit={submitShortReview}>
                        <p className="inst"> <input id="shortMovieNameInput" placeholder="영화 제목" onChange={getMovieTitle}></input>에 대한 한 줄 리뷰를 작성하세요.</p>
                        <div classname="text-wrap">
                            <textarea id="shortTextArea" className="text-input" placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다." onChange={getContent}></textarea>
                            <div className="button-wrap">
                                <Button id="shortWriteBtn" className="submit-button" size ="lg" type="submit">저장</Button>
                            </div>
                        </div>
                    </form>
                    <input className="keyword-input" type='text' placeholder='#'/>
                    <span id="shortReviewBottomDiv">
                    <input className="check-box" type="checkbox" value="spoiler"></input>
                    <a className="check-inst">스포일러 포함</a>
                    </span>
                </div>
            </div>
        </>
    )
    
}
export default ShortWrite;