'use strict';

var mongoose = require('mongoose'),
Setting = mongoose.model('Settings'),
config = require('../../config'),
jwt = require('jsonwebtoken');

exports.list_all_settings = function(req, res) {
  User.find({role: 'user'}, function(err, user) {
    if (err)
      res.json({ success: false, error: err });
    
    res.json({ success: true, users: user });
  });
};

exports.get_settings = function(req, res) {
  
  Setting.findOne({key: 'radius'}, function(err, setting) {
    if (err)
      res.json({ success: false, error: err });
    
    res.json({ success: true, settings: setting });
  });
};

exports.update_settings = function(req, res) {
  var data = req.body;

  for(var j in data){
    var sub_key = j;
    var sub_val = data[j];
  } 

  Setting.findOne({key: sub_key})
    .exec(function (err, setting){
        if(err){
          res.json({success: false, error: err});
        } else {
            if(!setting){
              var new_setting = new Setting({key: sub_key, value:sub_val});
              new_setting.save(function(err, setting) {
                if(err){
                  res.json({success: false, error: err});
                } else {
                  res.json({success: true, message: 'Inserted'});
                }
              });
        
            } else {
              
              setting.value = sub_val;
              setting.save(function(err, updatedSetting){
                  if(err){
                    res.json({success: false, error: err});
                  } else {
                    res.json({success: true, message: 'Updated'});
                  }
              })
            }
        }
    }); 

};

/*exports.update_settings = function(req, res) {
  var data = req.body;
  var dt = null;
   for(var j in data){
        var sub_key = j;
        var sub_val = data[j];
        //dt = dt + sub_key+'>>'+sub_val;
        Setting.findOne({key: sub_key})
        .exec(function (err, setting){
            if(err){
              res.json({success: false, error: err});
            } else {
                if(!setting){
                  var new_user = new Setting({key: sub_key, value: sub_val});
                  new_user.save(function(err, user) {
                    if(err){
                      res.json({success: false, error: err});
                    } else {
                      res.json({success: true, message: 'Inserted'});
                    }
                  });
            
                } else {
                  
                  setting.value = sub_val;
                  setting.save(function(err, updatedSetting){
                    
                  })
                }
            }
        }); 
        
    }

     
};*/