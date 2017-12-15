var mongoose = require("mongoose");
var User;
var Medication = require('../models/medication.js')
var userSchema = new mongoose.Schema({
    lastName:{type:String,required:true},
    firstName:{type:String,required:true},
    town:{type:String,required:true},
    medications:[{type:mongoose.Schema.ObjectId,ref:'Medication'}],
    currentPulse:{type:Number,default:-1},
    currentTemp:{type:Number,default:-1},
    created:{type:Date,default:Date.now},
    modified:{type:Date,default:Date.now}
});

       if(mongoose.models.User)
          User = mongoose.models.User;
       else
           User = mongoose.model('User',userSchema);

module.exports = User;

