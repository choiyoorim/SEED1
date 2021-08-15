const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors");
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
      //쿠키 유지 시간: 24시간
      expires: 60*60*24*1000,
      httpOnly: true,
    },
  })
);

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
    "SELECT *FROM USER WHERE userID = ?",
    userID, 
    (err, result) =>{
      if(err){
        res.send({err: err})
      }
      
      if(result.length > 0){
        bcrypt.compare(userPW, result[0].userPW, (err, response)=>{
          if(response){
            req.session.user = result;
            console.log(req.session.user)
            res.send(result)
          } else{
            res.send({message: "아이디와 비밀번호가 일치하지 않습니다."});
          }
        })
      } else{
        res.send({message: "존재하지 않는 사용자 입니다."});
      }
    }
  );
});

//로그아웃
app.get('/user/logout', (req,res)=>{
  return res.clearCookie('user')
            .status(200)
            .json({ success: true,  });
})
// app.get("/api/logout",(req,res)=>{
//   res.cookie('user', 'none',{
//     expires: new Date(Date.now() + 5 * 1000),
//     httpOnly: true,
//   })
//   res.status(200)
//       .json({ success: true, message: 'User logged out successfully' })
// });

//리뷰가져오기
app.get("/api/reviewE/get",(req,res)=>{
  const sqlSelect = "SELECT * FROM REVIEW_E";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
  })
});

app.listen(3002, ()=>{
  console.log('running on port 3002');
});