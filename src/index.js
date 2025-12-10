const express = require('express');

const bodyParser = require('body-parser');
const app  = express();

const {PORT} = require('./config/ServerConfig')
const {sendBasicEmail} = require('./services/email-service')
const cron = require('node-cron');

const setupAndStartServer = ()=>{
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));
  
   app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`);
    // sendBasicEmail(
    //     'prasoon.rahul19@gmail.com',
    //     'prasoon.rahulkumar19@gmail.com',
    //     'testing mail ',
    //     'this is test.'
    // );
    // cron.schedule('*/1 * * * *', () => {
    //     console.log('running a task every two minutes');
    //   });
});
}

setupAndStartServer();

// sanskars12363@gmail.com