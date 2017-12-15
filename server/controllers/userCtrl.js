
let express = require('express');
let User = require('../models/userModel.js');


let router = express.Router();


//you can request details of a single user if you send id in url param
router.get('/:id',function(req,res,next){
  let id = req.params.id;
  if(!id){
    return res.status(400).send("Please provide id in url segment");
  }

User.findOne({_id:id}).populate('medications').exec(function(err,user){
  if(err)
    return next(err);

  return res.send(user);
});

});

router.get('/', function(req,res,next){
  User.find({},function(err,users){
    if(err) {
      return next(err);
    }
    return res.send(users);
  });
});

router.post('/', function(req,res,next){
  if(req.body && req.body.firstName && req.body.lastName && req.body.town){
    let newUser = new User({firstName:req.body.firstName, lastName: req.body.lastName, town:req.body.town});
    newUser.save(function(err,result){
      if(err){
        return next(err);
      }
      return res.send('User saved successfully');
    });
  } else {
    return res.status(400).send("incorrect user object please send firstName, lastName, and town values");
  }
});

module.exports = router;