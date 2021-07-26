import React from 'react';
import './Write.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Navi from '../../Components/Navi'
import Button from "../../Components/Button"
import BasicButtonGroup from "../../Components/SelectButton";


function Write(){
        return(
            <>
                <section>
                    <div className="Write_main">
                        <div className="select-button-wrap">
                            <BasicButtonGroup num={1}></BasicButtonGroup>
                        </div>
                        <input className="movie-search" type='text' placeholder='Search'/>
                        <div className="form-wrap">
                        <h2 id="shortlogo">EXPRESS REVIEW</h2>
                            <input className="title-input" type='text' placeholder='제목'/>
                            <CKEditor
                                editor={ ClassicEditor }
                                data="<p>리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 삭제될 수 있습니다.</p>"
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                            <div className="setting-wrap">
                                <input className="keyword-input" type='text' placeholder='#'/><br/>
                                <div className="check">
                                    <input className="check-box" type="checkbox" value="spoiler"></input>
                                    <a className="check-inst" id="warnmsg">스포일러가 될 수 있는 리뷰를 포함하고 있습니다.</a>
                                </div><br/>
                                <Button className="submit-button" size="sm" id="expressbtn">저장</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
}

export default Write;