const sender = require('../config/emailConfig');

const sendBasicEmail = async(mailFrom , mailTo , mailSubject , mailBody) => {
   const response = await sender.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    });
    console.log(response);
}

module.exports = {sendBasicEmail} ; 