
let express = require('express');


let router = express.Router();



router.get('/', function(req,res,next){
  return res.send('Server running')
});


module.exports = router;