'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var isEmail = require('validator');

var Schema = mongoose.Schema;

//import { isEmail } from 'validator';

var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        //validate: { validator: isEmail, message: 'Invalid email.' },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Please enter the password'
    },
    first_name: {
        type: String,
        required: 'Please enter the first name',
        default: 'null'
    },
    last_name: {
        type: String,
        required: 'Please enter the last name',
        default: 'null'
    },
    zip: {
        type: String,
        default: 'null'
    },
    address: {
        type: String,
        default: 'null'
    },
    phone: {
        type: String,
        default: 'null'
    },
    role: {
        type: [{
            type: String,
            enum: ['admin', 'user']
        }],
        default: ['user']
    },
    access_token: {
        type: String,
    },
    signup_type: {
        type: [{
            type: String,
            enum: ['generic', 'facebook', 'google']
        }],
        default: ['generic']
    },
    social: {
        type: String,
        default: 'null'
    },
    email_verify: {
        type: [{
            type: String,
            enum: ['yes', 'no']
        }],
        default: ['no']
    },
    device_token:{
      type: String, 
      default: 'null'
    },
    device_id:{
      type: String, 
      default: 'null'
    },
    device_type:{
      type: String, 
      default: 'null'
    },
    device_platform:{
      type: String, 
      default: 'null'
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'inactive', 'block', 'deleted']
        }],
        default: ['inactive']
    }
},
{
    timestamps: true,
    typecast: true
});

UserSchema.pre('save', function(next){

    var user = this;
    if(!user.isModified('password')){ return next(); }

    if(user.password){
        bcrypt.hash(user.password, null, null, function(err, hash){
          if(err){ return next(err); }
          user.password = hash;
          next();
        });
    }

});

UserSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Users', UserSchema);