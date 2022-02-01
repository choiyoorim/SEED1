const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors");
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

var db = require('./db');

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(
  session({
    key: "user",
    secret: "seedmovie",
    resave: false,
    saveUninialized: false,
    cookie: {
      //쿠키 유지 시간: 10일
      expires: 60*60*24*10,
      httpOnly: true,
    },
  })
);

// 회원 정보 수정
app.post('/modify', (req, res)=>{
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const userNickname = req.body.userNickname;

  bcrypt.hash(userPW, saltRounds, (err, hash)=>{
    if(err){
      console.log(err);
      res.send({
        modified: false,
        modifyMessage: "회원 정보 수정 실패"
      });
    }

    if(userPW === ''){
      // pw 변경 안했을 경우 닉네임만 수정
      db.query(
        "UPDATE USER SET userNickname=? WHERE userID=?",
        [userNickname, userID],
        (err, result) =>{
          console.log(err);
        }
      );
      res.send({
        modified: true,
        userPW: hash,
        modifyMessage: "회원 정보 수정 완료"
      });
    }else{
      // PW, nickname 모두 수정한 경우
      db.query(
        "UPDATE USER SET userPW=?, userNickname=? WHERE userID=?",
        [hash, userNickname, userID],
        (err, result) =>{
          console.log(err);
        }
      );
      res.send({
        modified: true,
        userPW: hash,
        modifyMessage: "회원 정보 수정 완료"
      });
    }
  })
});

//회원가입
app.post('/register', (req, res)=>{
  const userID = req.body.userID;
  const userPW = req.body.userPW;
  const userEmail = req.body.userEmail;
  const userNickname = req.body.userNickname;

  bcrypt.hash(userPW, saltRounds, (err, hash)=>{
    if(err){
      console.log(err)
    }
    db.query(
      "INSERT INTO USER (userID, userPW, userEmail, userNickname) VALUES (?,?,?,?)",
      [userID, hash, userEmail, userNickname],
      (err, result) => {
          console.log(err);
      }
    );
  })
  
});

//인증 JWT
const verifyJWT = (req, res, next)=>{
  const token = req.headers["x-access-token"]

  if(!token){
    res.send("토큰이 필요합니다.")
  } else{
    jwt.verify(token, "jwtSecret", (err, decoded)=>{ //!!jwt비밀번호!!
      if(err){
        res.json({auth: false, message: "인증에 실패했습니다."})
      } else {
        req.email = decoded.userEmail;
        next();
      }
    })            
}};
app.get('/user/isUserAuth', verifyJWT , (req, res)=>{
  //res.send("인증되었습니다!")
  res.send(res.json.auth);
});

//로그인
app.get("/user/login", (req, res)=>{
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user})
  } else{
    res.send({loggedIn: false});
  }
});
app.post("/user/login", (req, res)=>{
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  db.query(
    "SELECT * FROM USER WHERE userID = ?",
    userID, 
    (err, result) =>{
      if(err){
        res.send({err: err})
      }
      
      if(result.length > 0){
        bcrypt.compare(userPW, result[0].userPW, (err, response)=>{
          if(response){
            const userEmail = result[0].userEmail;
            //!!jwt비밀번호!!
            const token = jwt.sign({userEmail}, "jwtSecret", {
              expiresIn: 300, //토큰 만료기간
            })
            req.session.user = result;
            res.json({auth: true, token: token, result: result});
          } else{
            res.json({auth: false, message: "아이디와 비밀번호가 일치하지 않습니다."});
            //res.send({message: "아이디와 비밀번호가 일치하지 않습니다."});
          }
        })
      } else{
        res.json({auth: false, message: "존재하지 않는 사용자입니다." });
        //res.send({message: "존재하지 않는 사용자 입니다."});
      }
    }
  );
});

//로그아웃
app.get('/user/logout', (req,res)=>{
  return res.clearCookie('user', {path: '/'})
    .status(200)
    .json({ auth: false, });
})

//회원탈퇴
app.post("/user/withdrawal", (req, res)=>{
  const userID = req.body.userID;
  const userPW = req.body.userPW;

  db.query(
    "SELECT userPW FROM USER WHERE userID = ?",
    userID, 
    (err, result) =>{
      if(err){
        res.send({err: err})
      }
      if(result.length > 0){
        bcrypt.compare(userPW, result[0].userPW, (error, response)=>{
          if(response){
            //비밀번호가 일치하는 경우
            db.query("DELETE FROM USER WHERE userID = ? AND userPW = ?", 
            [userID, result[0].userPW],
            (err2, result2) =>{
              if(err2){
                res.send({err: err2})
              }else {
                req.session.destroy();
              }
            });
            res.json({success: true});
          } else{
            res.json({success: false, message: "비밀번호가 일치하지 않습니다."});
          }
        })
      } else{
        res.json({success: false, message: "존재하지 않는 사용자입니다." });
      }
    }
  );
});

//좋아요 개수 SELECT


//좋아요 개수 INSERT


//Like: 사용자가 좋아요한 리뷰 목록 가져오기
app.post("/Like/reviewS",(req, res)=>{
  const userID =  req.body.userID;
  const sqlSelect = "SELECT * FROM LIKE_S JOIN REVIEW_S ON LIKE_S.reviewID = REVIEW_S.reviewID WHERE LIKE_S.userID = ?";
  db.query(sqlSelect, userID , (err, result)=>{
    res.send(result);
  })
});

app.post("/Like/reviewE",(req, res)=>{
  const userID =  req.body.userID;
  const sqlSelect = "SELECT * FROM LIKE_E JOIN REVIEW_E ON LIKE_E.reviewID = REVIEW_E.reviewID WHERE LIKE_E.userID = ?";
  db.query(sqlSelect, userID , (err, result)=>{
    res.send(result);
  })
});


//Mypage: 사용자가 작성한 리뷰가져오기
app.post("/reviewS/list",(req,res)=>{
  const userID = req.body.userID;
  const sqlSelect = "SELECT R.reviewID, R.userID, M.title, R.movieCODE, R.reviewContent, R.viewCount, DATE_FORMAT(R.preparationDate, '%Y. %m. %d') AS date FROM REVIEW_S R JOIN  moviedata M ON R.movieCODE = M.movieCODE WHERE R.userID = ? ORDER BY R.preparationDate DESC";
  db.query(sqlSelect, userID , (err, result)=>{
    res.send(result);
  })
});

app.post("/reviewE/list",(req,res)=>{
  const userID = req.body.userID;
  const sqlSelect = "SELECT R.reviewID, R.userID, M.title, R.movieCODE, R.reviewTitle, R.reviewContent, R.viewCount, DATE_FORMAT(R.preparationDate, '%Y. %m. %d') AS date FROM REVIEW_E R JOIN  moviedata M ON R.movieCODE = M.movieCODE WHERE R.userID = ? ORDER BY R.preparationDate DESC";
  db.query(sqlSelect, userID , (err, result)=>{
    res.send(result);
  })
});

//Write: 리뷰 ID에 해당하는 리뷰 내용 가져오기
app.post("/reviewS/edit",(req,res)=>{
  const reviewID = req.body.reviewID;
  const sqlSelect = "SELECT * FROM REVIEW_S R JOIN  moviedata M ON R.movieCODE = M.movieCODE WHERE R.reviewID = ?";

  db.query(sqlSelect, reviewID , (err, result)=>{
      res.send(result);
  })
});

app.post("/reviewE/edit",(req,res)=>{
  const reviewID = req.body.reviewID;
  const sqlSelect = "SELECT * FROM REVIEW_E R JOIN  moviedata M ON R.movieCODE = M.movieCODE WHERE R.reviewID = ?";

  db.query(sqlSelect, reviewID , (err, result)=>{
      res.send(result);
  })
});

//Write: 리뷰Short 작성하기
app.post("/shortsubmit",(req,res)=>{
  const title = req.body.title
  console.log(title);
  const content = req.body.content
  console.log(content);
  const id = req.body.id
  console.log(id);
  const date = req.body.date
  db.query("SELECT movieCODE FROM moviedata where title=?",title,(err,result1)=>{
    console.log(result1);
    if(!result1[0]){
      console.log('여기?');
      db.query("INSERT INTO moviedata (title) VALUES (?)",
      title,
      (err,result) =>{
        if(err){
          console.log(err);
        }
      })

      db.query("SELECT movieCODE FROM moviedata where title=?",title,(err,result2)=>{
        console.log(result2);
        db.query("INSERT INTO REVIEW_S (movieCODE,reviewContent,userID,preparationDate) VALUES (?,?,?,?)",
          [result2[0].movieCODE,content,id,date],
            (err,result) => {
              if(err){
                console.log(err);
              }
              else res.status(200)
                      .json({success:true})
            }
        );
      })
    }
    else{
      db.query("INSERT INTO REVIEW_S (movieCODE,reviewContent,userID,preparationDate) VALUES (?,?,?,?)",
        [result1[0].movieCODE,content,id,date],
        (err,result) => {
          if(err){
            console.log(err);
          }
          else res.status(200)
                  .json({success:true})
        }
      );
    }
  })
});

//Write: 리뷰 Short 수정하기
app.post("/shortsubmit/update",(req,res)=>{
  const content = req.body.content;
  const reviewID = req.body.reviewID;

  db.query("UPDATE REVIEW_S SET reviewContent = ?, modification = '1' WHERE reviewID = ?",
   [content, reviewID], (err,result)=>{
    if(err){
      console.log(err);
      res.json({success:false, err})
    } else{
      res.status(200).json({success:true})
    }
  })
});

//Write: 리뷰 Short 삭제하기
app.post("/shortsubmit/delete",(req,res)=>{
  const reviewID = req.body.reviewID;

  db.query("DELETE FROM REVIEW_S WHERE reviewID = ?",
   reviewID, (err,result)=>{
    if(err){
      console.log(err);
      res.json({success:false, err})
    } else{
      res.status(200).json({success:true})
    }
  })
});


//Write: 리뷰 Express 작성하기
app.post("/expresssubmit",(req,res)=>{
  const title = req.body.title
  console.log(title);
  const movietitle = req.body.movietitle
  console.log(movietitle);
  const content = req.body.content
  console.log(content);
  const id = req.body.id
  console.log(id);
  const date = req.body.date
  // const reviewid = req.body.reviewid
  // const edit = req.body.edit
  db.query("SELECT movieCODE FROM moviedata WHERE title=?",movietitle,(err,result1)=>{
    console.log(result1);
    //db에 영화가 없는 경우
    if(!result1[0]){
      console.log('여기?');
      db.query("INSERT INTO moviedata (title) VALUES (?)",  //새로 입력한 영화 db에 추가
      movietitle,
      (err,result) =>{
        if(err){
          console.log(err);
        }
      })

      //입력한 영화 검색
      db.query("SELECT movieCODE FROM moviedata WHERE title=?",movietitle,(err,result2)=>{
        console.log(result2);
        //검색 영화와 작성한 리뷰 db에 저장
        db.query("INSERT INTO REVIEW_E (movieCODE, reviewTitle, reviewContent, userID, preparationDate) VALUES (?,?,?,?,?)",
          [result2[0].movieCODE,title,content,id,date],
          (err,result) => {
            if(err){
              console.log(err);
            }
            else res.send({success:true})
          }
        );
      })
    }
    else{ //db에 있는 영화인 경우 입력한 리뷰 내용 db에 저장
        db.query("INSERT INTO REVIEW_E (movieCODE,reviewTitle,reviewContent,userID,preparationDate) VALUES (?,?,?,?,?)",
        [result1[0].movieCODE,title,content,id,date],
        (err,result) => {
          if(err){
            console.log(err);
          }
          else res.send({success:true})
        }
      );
    }
  });

});

//Write: 리뷰 Express 수정하기
app.post("/expresssubmit/update",(req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const reviewID = req.body.reviewID;

  db.query("UPDATE REVIEW_E SET reviewTitle = ?, reviewContent = ?, modification = '1' WHERE reviewID = ?",
   [title, content, reviewID], (err,result)=>{
    if(!err){
      res.status(200).json({success:true})
    } else{
      console.log(err);
      res.json({success:false, err})
    }
  })
});

//ReviewDetails: 리뷰 Short 삭제하기
app.post("/short/delete",(req,res)=>{
  const reviewID = req.body.reviewID;

  db.query("DELETE FROM REVIEW_S  WHERE reviewID = ?",
   reviewID, (err,result)=>{
    if(!err){
      res.status(200).json({success:true})
    } else{
      console.log(err);
      res.json({success:false, err})
    }
  })
});

//Write: 리뷰 Express 삭제하기
app.post("/expresssubmit/delete",(req,res)=>{
  const reviewID = req.body.reviewID;

  db.query("DELETE FROM REVIEW_E  WHERE reviewID = ?",
   reviewID, (err,result)=>{
    if(!err){
      res.status(200).json({success:true})
    } else{
      console.log(err);
      res.json({success:false, err})
    }
  })
});

//ExpressReview: 해당 영화 리뷰E 가져오기
app.get('/getshortreview',(req,res)=>{
  db.query("SELECT R.reviewID,R.userID,M.title,R.reviewContent,R.preparationDate FROM REVIEW_S R JOIN moviedata M ON R.movieCODE = M.movieCODE",
    (err,result)=>{
      res.send(result);
    }
  )
});
//ShortReview: 해당 영화 리뷰S 가져오기
app.get('/getexpressreview',(req,res)=>{
  db.query("SELECT E.reviewID,E.userID,M.title,E.reviewContent,E.reviewTitle,E.preparationDate FROM REVIEW_E E JOIN moviedata M ON E.movieCODE = M.movieCODE",
    (err,result)=>{
      res.send(result);
    }
  )
});

app.post('/getreviewcontent',(req,res)=>{
  const reviewId = req.body.reviewID;

  db.query("SELECT E.reviewID,E.userID,M.title,E.reviewTitle,E.reviewContent,E.preparationDate FROM REVIEW_E E JOIN moviedata M ON E.movieCODE = M.movieCODE WHERE reviewID= ?",reviewId,
    (err,result)=>{
      console.log(result);
      res.send(result);
    }
  )
});

app.post('/getmovietitle',(req,res)=>{
  const moviecode = req.body.movieCODE;
  console.log(moviecode);
  db.query("SELECT title FROM moviedata WHERE movieCODE = ?",moviecode,
  (err,result)=>{
    console.log(result);
    res.send(result);
  })
});

//See
//SeeMain : 영화 검색
app.post("/api/see/searchMovie", (req, res) => {
  const search = "%" + req.body.search + "%";
  console.log(search);
  const sql = "SELECT * FROM moviedata WHERE title LIKE ?"
  db.query(sql, [search], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//SeeMain : 좋아요 수 많은 리뷰E TOP 2
app.get("/api/see/topLikeReviewsE", (req, res) => {
  const sql = "SELECT * FROM REVIEW_E ORDER BY `likeCount` DESC LIMIT 2";
  db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//SeeMain : 좋아요 수 많은 리뷰S TOP 2
app.get("/api/see/topLikeReviewsS", (req, res) => {
  const sql = "SELECT * FROM REVIEW_S ORDER BY `likeCount` DESC LIMIT 2";
  db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//SeeMain : 리뷰 수 많은 영화 TOP 2
app.get("/api/see/movie", (req, res) => {
  const sql = "SELECT * FROM moviedata LIMIT 2";
  db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//MovieDetail : movieCODE로 영화 정보 가져오기
app.post("/api/see/movie/info", (req, res) => {
  const movieCODE = req.body.movieCODE;
  const sql = "SELECT * FROM moviedata WHERE movieCODE = (?)";
  db.query(sql, [movieCODE], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
})

//MovieDetail : movieCODE로 리뷰E 목록 가져오기
app.post("/api/see/movie/reviewListE", (req, res) => {
  const movieCODE = req.body.movieCODE;
  const sql = "SELECT * FROM REVIEW_E WHERE movieCODE = (?)";
  db.query(sql, [movieCODE], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//MovieDetail : movieCODE로 리뷰S 목록 가져오기
app.post("/api/see/movie/reviewListS", (req, res) => {
  const movieCODE = req.body.movieCODE;
  const sql = "SELECT * FROM REVIEW_S WHERE movieCODE = (?)";
  db.query(sql, [movieCODE], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//ReviewListCard : 링크 클릭 시 조회수 증가
app.post("/api/see/review/reviewE/view", (req, res) => {
  const reviewID = req.body.id;
  const view = req.body.view;
  const sql = "UPDATE REVIEW_E SET viewCount = (?) WHERE reviewID = (?)";
  db.query(sql, [view, reviewID], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//ReviewDetail: reviewID로 리뷰 가져오기
app.post("/api/see/review/reviewE/info", (req, res) => {
  const reviewID = req.body.reviewID;
  const sql = "SELECT * FROM REVIEW_E WHERE reviewID = (?)";
  db.query(sql, [reviewID], (err, result) => {
      if(err){
        console.log(err);
      }else {
        res.send(result);
      }
    }
  )
});

//ReviewDetail / Like : reviewID로 좋아요 수 가져오기
app.post("/api/see/review/reviewE/like/count", (req, res) => {
  const reviewID = req.body.reviewID;
  const sql = "SELECT * FROM LIKE_E WHERE reviewID = (?)";
  db.query(sql, [reviewID], (err, result) => {
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
})

//ReviewDetail / Like : reviewID & usreID로 좋아요 여부 확인
app.post("/api/see/review/reviewE/like/check", (req, res) => {
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const sql = "SELECT * FROM LIKE_E WHERE reviewID = (?) AND userID = (?)";
  db.query(sql, [reviewID, userID], (err, result) => {
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
})

//ReviewDetail / Like : reviewID & usreID로 좋아요 삭제
app.post("/api/see/review/reviewE/like/delete", (req, res) => {
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const sql = "DELETE FROM LIKE_E WHERE reviewID = (?) AND userID = (?)";
  db.query(sql, [reviewID, userID], (err, result) => {
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
})

//ReviewDetail / Like : reviewID & usreID로 좋아요 생성
app.post("/api/see/review/reviewE/like/create", (req, res) => {
  const reviewID = req.body.reviewID;
  const userID = req.body.userID;
  const sql = "INSERT INTO LIKE_E (reviewID, userID) VALUES (?, ?)";
  db.query(sql, [reviewID, userID], (err, result) => {
    if(err){
      console.log(err);
    }else {
      res.send(result);
    }
  })
})

//구독자 수 가져오기
app.post("/subscribe/subscribeNumber", (req, res) => {
  const writerID = req.body.writerID;
  const sql = "SELECT * FROM Subscribe WHERE writerID = (?)";
  db.query(sql, [writerID], (err, result) => {
      if (err) return res.status(400).send(err);
      return res
      .status(200)
      .json({ success: true, subscribeNumber: result.length });
  });
});

//회원구독 여부 확인
app.post("/subscribe/subscribed", (req, res) => {
  const userID =  req.body.userID;
  const writerID = req.body.writerID;
  const sql = "SELECT * FROM Subscribe WHERE userID = (?) AND writerID = (?)";
  db.query(sql, [userID, writerID], (err, result) => {
      if (err) res.status(400).send(err);
      let sub = false;
      if (result.length !== 0) {
          sub = true;
      }
      res.status(200).json({ success: true, subscribed: sub });
  });
});


//구독 취소 하기
app.post("/subscribe/unSubscribe", (req, res)=>{
  const userID =  req.body.userID;
  const writerID = req.body.writerID;
  const sql = "DELETE FROM Subscribe WHERE userID = ? AND writerID = ?";
  db.query(sql, [userID, writerID], (err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result});
  })
});


//구독 하기
app.post("/subscribe/Subscribe", (req, res)=>{
  const userID =  req.body.userID;
  const writerID = req.body.writerID;
  const sql = "INSERT INTO Subscribe (userID, writerID) VALUES (?,?)";
  db.query(sql, [userID, writerID], (err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true});
  })
});

//리뷰수정 여부 가져오기
app.post("/modification/isModification", (req, res) => {
  const reviewID = req.body.reviewID;
  const sql = "SELECT * FROM REVIEW_E WHERE reviewID=? AND modification=1";
  db.query(sql, reviewID, (err, result) => {
    console.log(result);
    if (err) res.status(400).send(err);
    
    let mod = false;
    if (result.length !== 0) {
        mod = true;
    }
    res.status(200).json({ success: true, modificated: mod });
  });
});

//소식(알림) 리스트
app.post("/notification/get",(req, res)=>{
  const userID =  req.body.userID;
  db.query("SELECT * FROM noti WHERE userID = ?", [userID] , (err, result)=>{
    if (err) res.status(400).send(err);

    let list = false;
    if (result.length !== 0) {
        list = true;
    }
    res.status(200).json({ noti: result, list: list });
  })
});

//소식(알림) 삭제
app.post("/notification/delete",(req, res)=>{
  const notID =  req.body.notID;
  db.query("DELETE FROM noti WHERE notID = ?", [notID] , (err, result)=>{
    if(err){
      console.log(err);
      res.json({success:false, err})
    } else{
      res.status(200).json({success:true})
    }
  })
});

app.listen(3002, ()=>{
  console.log('running on port 3002');
});