/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = {
    port: process.env.PORT || 4044, //3000
    database : "mongodb://localhost:27017/downtimenyc",
    /*database : {
        username: "mongoAdminBIT",
        password: "BiT^7129~jsQ​-P",
        authDb: "admin",
        port: 27017,
        host: "127.0.0.1",
        dbName: "downtimenyc"
    },*/
    /*database : {
        username: "barbarakaresapp",
        password: "barbara963789",
        authDb: "admin",
        port: 27017,
        host: "127.0.0.1",
        dbName: "downtimenyc"
    },*/
    secret : 'Afv2ilj0iaT1@sB6r345-ipn0ilu9maI-Tn2n9eR',
    dev_mode : true,
    // __site_url: 'http://162.243.110.92:4000/', /* API URL */
    // __admin_url: 'http://162.243.110.92/tanmay/barbarakares/admin/', /* Admin URL */
    // __image_url: 'http://162.243.110.92/tanmay/barbarakares/service/assets/images/', /* IMAGE URL */
    
    __site_url: 'http://localhost:4044/',
    __admin_url: 'http://localhost:4400/',
    __image_url: '/images',

    __image_url: '/images',
    appUrlAndroid: 'http://play.google.com',
    appUrliOS: 'https://itunes.apple.com',
    email: {  
        host: 'smtp.gmail.com',
        user: 'pritamghosh8191@gmail.com',
        pass: 'Pritam@brainium17',
        // user: 'souravs.brainium@gmail.com',
        // pass: 'brainium#789',
        adminEmail: 'pritamghosh.brainium@gmail.com',
        port: 465,
        service: 'gmail',
        fromName: 'Downtime.NYC'
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
    push: {
        android: {
            serverKey: 'AAAAlUH2sFo:APA91bEsQR4F1YP7qkean6e5Sf87CCLR9JwXxjNGT9e9yuZPnbaPOakGSdm4l8FiRYORApq5tDMS3ZyEHuvkOu4l4Vy9HSCnIgb9_Eh7b5fWBGBkPLu_M-SLho2maiA-bm8qcIijazVJ'
        },
        iOS: {
            path: './AuthKey_ZF284GX2JB.p8',
            keyId: 'ZF284GX2JB',
            teamId: '36UDYZABZ2'
        }
    },
    default: {
        role: 'user'
    },
    package: 'com.downtimenyc.app'
};
module.exports = config;

