/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = {
    port: process.env.PORT || 4040,
    database : 'mongodb://localhost:27017/camera_alert',
	//database: "mongodb://mongoAdminBIT:BiT~2016^MdB@localhost:27017/fencal?authSource=admin",
    /*database : {
        username: "mongoAdminBIT",
        password: "BiT~2016^MdB",
        authDb: "admin",
        port: 27017,
        host: "127.0.0.1",
		//host: "localhost",
        dbName: "fencal"
    },*/
    secret : 'Afv2ilj0iaT1@sB6r345-ipn0ilu9maI-Tn2n9eR',
    dev_mode : true,
    //__site_url: 'http://162.243.110.92:3131/',
    __site_url: 'http://localhost:4040/',
    __admin_url: 'http://localhost:4200/',
	appUrlAndroid: 'http://play.google.com',
    appUrliOS: 'http://play.google.com',
    email: {  
        host: 'smtp.gmail.com',
        user: 'pritamghosh8191@gmail.com',
        pass: 'Pritam@123',
        adminEmail: 'pritamghosh.brainium@gmail.com',
        port: 587,
        service: 'gmail'
    },
     status: {
        OK: 200,
        CREATED: 201,
        FOUND: 302,
        BAD_REQUEST: 400,
        NOT_AUTHORIZED: 401,
        PAYMENT_REQUERED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        SERVER_ERROR: 500,
        NO_SERVICE: 503
    },
    push:{
        requestUrl: 'https://api.ionic.io/push/notifications',
        profileName: 'work_production',
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNGNhZGRjNy1jOTU2LTQ4NDMtYTg4OC1mN2MwNmEwNDRhZmEifQ.G3JvWeNd0DykXwIggmQwgK9gtKMXzwLI5zewnvY4miU'   
    }
};
module.exports = config;

