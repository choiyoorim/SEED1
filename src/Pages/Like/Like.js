import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import  './Like.css';

function Like() {

    const [movieReviewList_S, setReviewList_S] = useState([]);
    const [movieReviewList_E, setReviewList_E] = useState([]);
    const id = localStorage.getItem('userID');


    useEffect(()=>{
        Axios.post("http://localhost:3002/Like/reviewS", {
            userID: id
          }).then((response)=>{
          setReviewList_S(response.data);
        });

        Axios.post("http://localhost:3002/Like/reviewE", {
            userID: id
          }).then((response)=>{
          setReviewList_E(response.data);
          //console.log(response);
        });
    }, []);

    return (
    <section>
        <div class="Like_wrapper">
            <div class="likes">
                <h3 id="h3like">좋아요 누른 글</h3>
                <div class="likes_container list">
                    <div><h4 id="h4f">short</h4><h4 id="h4s">express</h4></div>
                    <form id="like">
                    <ul>
                        {movieReviewList_S.map((list) => {
                            return (
                            <li className={list.reviewID}>
                                <p>{list.reviewContent}</p>
                            </li>
                        ) })}
                    </ul>
                    </form>
                    <form id="like2">
                    <ul>
                        {movieReviewList_E.map((list) => {
                            return (
                            <li className={list.reviewID}>
                                <p>{list.reviewContent}</p>
                            </li>
                        ) })}
                    </ul>
                </form>
                </div>
            </div>
            <div class="subscribes">
                <h3 id="h3sub">구독</h3>
                <div class="subscribes_container list">
                    <form id="subs">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                    </form>
                    <form id="subs2">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </section>
    );
   }

   export default Like;