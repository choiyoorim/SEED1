import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import './ExpressReviewContent.css';

function ExpressReviewContent({match}){
    const [reviewContent,setReviewContent] = useState([]);
    const [state,setState] = useState('');
    useEffect(()=>{
        console.log(match.params.id)
      Axios.post('http://localhost:3002/getreviewcontent',{
          reviewID:match.params.id
      }).then((response)=>{
        console.log(response.data)
        setReviewContent(response.data);
        setState('fix');
      })
    },[state]);

    useEffect(()=>{
        setTimeout(function() {
          console.log('시간지남')
          setState("pass")
        }, 5000);
      },[])

    if(state==="fix"){
        return(
            <div className="reviewContentBox">
                <tr className="reviewInfo">
                    <td id="no">{reviewContent[0].reviewID}</td>
                    <td id="movie">{reviewContent[0].title}</td>
                    <td id="title">{reviewContent[0].reviewTitle}</td>
                    <td id="writer">{reviewContent[0].userID}</td>
                    <td id="date">{reviewContent[0].preparationDate}</td>
                </tr>
              <br></br>
                <div className="reviewcontent">
                    <h2>{reviewContent[0].reviewContent}</h2>
                </div>
            </div>
        )
    }
    else{
        return(
            <h2>loading중입니다</h2>
        )
    }
}

export default ExpressReviewContent;