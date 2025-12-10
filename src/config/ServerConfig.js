const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env.EMAIL_PASS , process.env.EMAIL_ID)

module.exports = {
    PORT : process.env.PORT,
    EMAIL_PASS : process.env.EMAIL_PASS,
    EMAIL_ID : process.env.EMAIL_ID
};