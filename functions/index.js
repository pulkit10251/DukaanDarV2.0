const functions = require("firebase-functions");

var fetch = require("node-fetch");

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.SendPushNotification = functions.database.ref('Customers/{id}/active').onCreate((event) =>{
    const root  = event.data.root;
})