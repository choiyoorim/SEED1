const express = require('express');
const app = express();
const port = process.env.port || 3002;
const cors = require('cors');
const bodyParser = require("body-parser");
// const api = require('./routes/index');
var db = require('./db');



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Hello soir!');
});



app.post("/text", (req, res) => {
    const text1 = req.body.inText;
    console.log(text1);
});

app.post("/join", (req, res) =>{

    console.log(req.body);
    // const input1 = req.body.userid;
    const id = req.body.userid;
    const pw = req.body.userpassword;
    const email = req.body.useremail;
    const nickname = req.body.usernickname;

    console.log(id);
    console.log(pw);
    console.log(email);
    console.log(nickname);

    const joinSql = "INSERT INTO USER (userID, userPW, userEmail, userNickname) values(?, ?, ?, ?)";
    
    var userparams = [id, pw, email, nickname];
    
    db.query(joinSql, userparams, (err, result) => {
        console.log("Record Inserted");
        console.log(result);
    })

    // const viewSql = "SELECT * FROM USER";
    // db.query(viewSql, (err, result) => {
    //     res.send(result);
    // })
});

// app.unsubscribe(cors());
// app.use('/api', api);

app.listen(port, ()=>{
    console.log(`서버 구동 중 : port ${port}`);
});