'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');
    var settings = require('../controllers/settingsController');

    /********************* USER ********************/
    app.route('/users') //  /:offset/:limit
        .get(user.list_all_users);


    app.route('/email_validate/:access_token')
        .get(user.email_validate);

    app.route('/user')
        .post(user.add_user)
        .get(user.read_a_user)
        .put(user.update_a_user)
        .delete(user.delete_a_user);

    app.route('/login')
    	.post(user.login);

	app.route('/forgot_password')
		.post(user.forgot_password);

	app.route('/change_password')
		.post(user.change_password);


    /********************* SETTINGS ********************/
    app.route('/settings')
        .get(settings.get_settings)
        .post(settings.update_settings);

};