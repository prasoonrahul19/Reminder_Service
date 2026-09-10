const sender = require('../config/emailConfig');
const TicketRepository = require('../Repository/ticket-repository');

const sendBasicEmail = async(mailFrom , mailTo , mailSubject , mailBody) => {
   const response = await sender.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:mailSubject,
        text:mailBody
    });
    console.log(response);
}


const fetchPendingEmails = async(timestamp) => {
    try {
        const repo = new TicketRepository();
        const response = await repo.get({status:"Pending"});
        return response;
    } catch (error) { throw error; }

}

const updateTicket = async(id , data) => {
    try {
        const repo = new TicketRepository();
        const ticket = await repo.update(id , data);
        return ticket;
    } catch (error) { throw error; }
};

const createNotificationTicket = async(data) => {
    const repo = new TicketRepository();
    return repo.create(data);
}
module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotificationTicket,
    updateTicket
}; 
