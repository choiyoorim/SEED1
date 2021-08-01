var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/', function(req, res){
    
    res.send({greeting:'Hello React x Node.js'});

});

router.post('/signup', (req, res) => {
    const data = req.body.data;
    console.log(data);
});

module.exports = router;
