import React, { Component, useEffect, useState }from "react";
import './Write.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from "../../Components/Button"
import BasicButtonGroup from "../../Components/SelectButton";
import Axios from "axios";


function Write(){

    const [expressReviewTitle,setExpressReviewTitle] = useState('');
    const [expressReviewMovieTitle,setExpressReviewMovieTitle] = useState('');
    const [expressReviewContent,setExpressReviewContent] = useState('');
    const [isFirst, setIsFirst] = useState(true);   //처음 작성 여부(처음이면 insert, 아니면 update)
    const [visibilityButton, setVisibilityButton] = useState('visible');
    const [displayDeleteButton, setDisplayDeleteButton] = useState('none');
    const userID = localStorage.getItem('userID');
    const reviewID = localStorage.getItem('reviewID');
    const [editdata, setEditdate] = useState();
    const edit = localStorage.getItem('edit');
    const dateInst = new Date();
    var dateMonth = dateInst.getMonth() + 1;
    if(dateMonth<=9) dateMonth = "0" + dateMonth;

    var dateDay = dateInst.getDate();
    if(dateDay<10) dateDay = "0" + dateDay; 
    const yyyy = dateInst.getFullYear().toString();
    var date = yyyy + "-" + dateMonth + "-" + dateDay;

    const submitExpressReview = (e) =>{
        if(isFirst){
            Axios.post('http://localhost:3002/expresssubmit',{
                title:expressReviewTitle,
                movietitle:expressReviewMovieTitle,
                content:expressReviewContent,
                id:userID,
                date:date
            }).then((res)=>{
                if(res.data.success){
                    alert('작성 완료')
                    window.location.href = '/mypage';
                }
                else{
                    alert('제출하는 과정에서 오류가 발생했습니다.');
                    console.log('오류')
                }
            })
        }
        else{
            Axios.post('http://localhost:3002/expresssubmit/update',{
                title:expressReviewTitle,
                content:expressReviewContent,
                reviewID:reviewID
            }).then((res)=>{
                // console.log(res);
                if(res.data.success){
                    setIsFirst(true);
                    alert('수정 완료');
                    window.location.href = '/mypage';
                } else{
                    alert('제출하는 과정에서 오류가 발생했습니다.');
                    console.log('오류');
                }
            })
        }
        e.preventDefault();
    };

    const deleteExpressReview = () =>{
        if(isFirst){
            setDisplayDeleteButton('none');
        }
        else{
            Axios.post('http://localhost:3002/expresssubmit/delete',{
                reviewID:reviewID
            }).then((res)=>{
                // console.log(res);
                if(res.data.success){
                    setIsFirst(true);
                    alert("삭제되었습니다.")
                    window.location.href = '/mypage';
                } else{
                    alert('제출하는 과정에서 오류가 발생했습니다.');
                    console.log('오류');
                }
            })
        }
    };

    const getTitle = (e) =>{
        const title = e.target.value;
        setExpressReviewTitle(title);
        console.log(title);
    }

    const getMovieTitle = (e) =>{
        const movietitle = e.target.value;
        setExpressReviewMovieTitle(movietitle);
        console.log(movietitle);
    }


    useEffect(()=>{
        if(edit==='true'){
            setDisplayDeleteButton('block');

            Axios.post("http://localhost:3002/reviewE/edit", {
                reviewID: reviewID
            }).then((response)=>{
                setExpressReviewMovieTitle(response.data[0].title)
                setExpressReviewTitle(response.data[0].reviewTitle)
                setEditdate(response.data[0].reviewContent)
            })
            setIsFirst(false);
            setVisibilityButton('hidden');
            localStorage.setItem('edit', 'false');
        } 

    }, []);

    return(
        <>
            <section>
                <div className="Write_main">
                    <div className="select-button-wrap" style={{visibility: visibilityButton}}>
                        <BasicButtonGroup num={1}></BasicButtonGroup>
                    </div>
                    <div className="form-wrap">
                        <form onSubmit={submitExpressReview}>
                            {isFirst? <input className="movietitle-input" type='text' placeholder='영화 제목' value={expressReviewMovieTitle} onChange={getMovieTitle}/>
                            : <input className="movietitle-input" type='text' placeholder='영화 제목' value={expressReviewMovieTitle} readOnly/>}
                            <input className="title-input" type='text' placeholder='제목' value={expressReviewTitle} onChange={getTitle}/>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={editdata}
                                    config={{
                                        // 여기에 config 입력
                                        // toolbar: {
                                        //     items:
                                        //     [
                                        //       'heading', '|', 
                                        //       'alignment',  
                                        //       'bold', 'italic', 'highlight', 'link', 'bulletedList', 
                                        //       'numberedList', 'imageUpload', 'blockQuote', 'insertTable', 
                                        //       'mediaEmbed', 'undo', 'redo'
                                        //     ],
                            
                                        //   },
                                        //   image: {
                                        //     toolbar: [
                                        //         'imageStyle:full',
                                        //         'imageStyle:side',
                                        //         '|',
                                        //         'imageTextAlternative'
                                        //     ]
                                        //   },
                                        //   heading: {
                                        //       options: [
                                        //         //   { model: 'heading1', view: 'h1', title: '제목1', class: 'ck-heading_heading1' },
                                        //           { model: 'heading2', view: 'h2', title: '제목2', class: 'ck-heading_heading2' },
                                        //           { model: 'heading3', view: 'h3', title: '제목3', class: 'ck-heading_heading3' },
                                        //           { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
                                        //       ]
                                        //   },
                                        // plugins: [CKFinder],
                                        placeholder: "리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다.",
                                      }}
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        console.log( { event, editor, data } );
                                        setExpressReviewContent(data);
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                            <div className="setting-wrap">
                                <input className="keyword-input" type='text' placeholder='#'/>
                                <div className="check">
                                    <input className="check-box" type="checkbox" value="spoiler"></input>
                                    <a className="check-inst">스포일러</a>
                                </div>
                                <Button className="submit-button" size="sm" type="submit">저장</Button>
                            </div>
                        </form>
                        <div className="delete-button" onClick={deleteExpressReview} style={{display: displayDeleteButton}}>
                            <Button size="sm" type="delete">삭제</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Write;