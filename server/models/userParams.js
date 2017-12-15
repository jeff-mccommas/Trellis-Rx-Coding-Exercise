/**
 * This model is for storing temperature and pulse changes for user whcih may be needed for reporting or graphs
 */

var mongoose = require('mongoose');
var User = require('./userModel.js');
var UserParams;
var UserParamsSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:User,required:true},
    created:{type:Date,default:Date.now },
		pulse:{type:Number},
		temperature:{type:Number}

});

       if(mongoose.models.UserParams)
           UserParams = mongoose.models.UserParams;
       else
           UserParams = mongoose.model('UserParams',UserParamsSchema);

module.exports = UserParams;
