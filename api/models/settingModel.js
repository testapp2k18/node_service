'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var isEmail = require('validator');

var Schema = mongoose.Schema;

//import { isEmail } from 'validator';

var SettingSchema = new Schema({    
    key: {
        type: String,
        required: 'Empty key',
        default: 'null'
    },
    value: {
        type: String,
        required: 'Empty value',
        default: 'null'
    },
},
{
    timestamps: true,
    typecast: true
});
/*
UserSchema.pre('save', function(next){

    var user = this;
    if(!user.isModified('password')){ return next(); }

    bcrypt.hash(user.password, null, null, function(err, hash){
      if(err){ return next(err); }
      user.password = hash;
      next();
    });

});
*/
module.exports = mongoose.model('Settings', SettingSchema);