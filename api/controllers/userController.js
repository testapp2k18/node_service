'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Users'),
config = require('../../config'),
jwt = require('jsonwebtoken'),
nodemailer = require('nodemailer'),
generator = require('generate-password'),
hbs = require('nodemailer-express-handlebars');

var transporter = nodemailer.createTransport({
  service: config.email.service,
  port: config.email.port,
  auth: {
    user: config.email.adminEmail,
    pass: config.email.pass
  }
});
transporter.use('compile', hbs({viewPath: './api/templates', extName: '.hbs'}));

function createToken(user) {
    var tokenData = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    var token = jwt.sign(tokenData, config.secret, {
        expiresIn: "5 days"
    });
    return token;
}

exports.all_users = function(req, res) {
  User.find({role: 'user'}, function(err, user) {
    if (err)
      res.json({ success: false, error: err });
    
    res.json({ success: true, data: user });
  });
};

exports.add_user = function(req, res) {

  var access_token = generator.generate({
    length: 15,
    numbers: true
  });

  req.body.access_token = access_token;
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err){
      res.json({ success: false, message: err });
    } else {

       var mailOptions = {
        from: config.email.adminEmail,
        to: user.email,
        subject: 'Welcome to Money Hitz',
        // text: 'That was easy!'
        template: 'email_template',
        context: {
            name: user.first_name,
            url: config.__admin_url+'#/email-verify/' + user.access_token, //#/
            base_url: config.__site_url,
            image_url: config.__image_url
        }
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json({ success: false, message: error });
        } else {
          res.json({ success: true, data: user, mail: info.response, message: 'You have successfully registered' });
        }
      });

    }
  });
};

exports.email_verify = function(req, res){

  var access_token = req.body.access_token;

  User.findOne({access_token: access_token})
    .exec(function (err, user){

        if(err){
          res.json({success: false, error: err});
        } else {
          if(!user){
            res.json({success: false, message: 'Invalid token'});
          } else {
            
            user.status = 'active';
            user.email_verify = 'yes';
            user.save(function(err, updatedUser){
              if(err){
                res.json({success: false, error: err});
              } else {
                res.json({success: true, message: 'Your account has been activated successfully', data: user});
              }
            })
          }
        }
  }); 
};

exports.read_a_user = function(req, res) {
  
  var _id = req.params.userId == undefined ? req.decoded._id : req.params.userId; 
  User.findById(_id, { password: 0, role: 0 }, function(err, user) {
    if (err)
      res.json({ success: false, error: err });
    
    res.json({ success: true, data: user });
  });
};

exports.update_a_user = function(req, res) {

  if(req.body.password){
    var password = req.body.password;
    req.body.password = '';
  } else {
    delete req.body.password;
  }

  var _id = req.params.userId == undefined ? req.decoded._id : req.params.userId;
  User.findOneAndUpdate({_id: _id}, req.body, {new: true}, function(err, user) {
    if (err)
      res.json({ success: false, error: err });
    else {

      if(password){
        user.password = password;
        user.save(function(err, updatedUser){
          if(err){
            res.json({success: false, message: 'This email address is already exists', data: err});
          } else {
            res.json({success: true, message: 'Update a user with password', data: user});
          }
        }) 

      } else {
        res.json({success: true, message: 'Update a user', data: user});
      }

    }
  });
};

exports.delete_a_user = function(req, res) {
  var _id = req.params.userId == undefined ? req.decoded._id : req.params.userId;
  User.remove({_id: _id}, function(err, user) {
    if (err)
      res.json({ success: false, error: err });
    
    res.json({ success: true, message: 'User successfully deleted' });
  });
};

exports.login = function(req, res){
    if(req.body.email && req.body.password) {
      var email = req.body.email;
      User.findOne({email: email})
      .exec(function (err, user) {
        if (err) {
          res.json({success: false, error: err});
        } else {
          if(!user) {
            res.json({success: false, message: "Invalid EmailID"});
          } else {
              if (!user.comparePassword(req.body.password)) {
                console.log('Invalid Password');
                res.json({success: false, message: "Invalid Password"});
              } else if(user.role == 'user' && user.status == 'inactive'){
                  res.json({success: false, message: "Your account still is inactive"});
              } else if(user.role == 'user' && user.status == 'block'){
                  res.json({success: false, message: "Your account has been blocked by admin"});
              } else {
                  var token = createToken(user);
                  var sessData = {
                        name:user.first_name,
                        token: token,
                        role: user.role
                      };
                      //req.session.admin = sessData;
                      res.json({success:true, data:sessData, message: "Logged in successfull"});
              }
          }
        }
      })
    } else {
        res.json({success: false, message: "Email and Password is required"});
    }
};

exports.forgot_password = function(req, res) {
  var password = generator.generate({
        length: 10,
        numbers: true
      });

  if(req.body.email){
    var email = req.body.email;

    User.findOne({email:email})
        .exec(function(err, user){
            if(err){
              res.json({success: false, error: err});
            } else {
              if(!user){
                res.json({success: false, message: 'Invalid Email'});
              } else {
                var mailOptions = {
                    from: config.email.adminEmail,
                    to: user.email,
                    subject: 'Forgot Password',
                    template: 'forgot_password',
                    context: {
                      name: user.first_name,
                      new_pass: password,
                      image_url: config.__image_url
                    }     
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                      res.json({success: false,  error: config});
                    } else {
                      user.password = password;
                      user.save(function (err, updatedUser) {
                        if (err) 
                          res.json({success: false,error:err});

                        res.json({success: true, message: "Password is updated successfully", data: updatedUser});
                      });
                      
                    }
                });

              }
            }
        })

  } else {
    res.json({success:false, message: 'Invalid Email'});
  }
};

exports.change_password = function(req, res){

  User.findById(req.decoded._id, function (err, user) {
    if (err) {
       res.json({success: false, error:err});
    } else {

        if(!user){
        
          res.json({success: false, message: 'Invalid userId'})
        
        } else {

          user.password = req.body.password;
          user.save(function (err, updatedUser) {
            if (err) res.json({success: false, error:err});
            res.json({success: true, message:"Password is updated successfully", data:updatedUser});
          });

        }
    }

  });
};

exports.generate_token = function(req, res){
  let token = createToken(req.body);
  var sessData = {
                    token: token,
                };
  res.json({success: true, message: 'New token', data: sessData});
};