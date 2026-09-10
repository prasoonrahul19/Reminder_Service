const cron = require('node-cron');
const emailService = require('../services/email-service');

// we will check is there any pending notification or email that has to be send
// by now by running cron job every one minute and send email

const setupNotificationJob = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      const response = await emailService.fetchPendingEmails();

      // ✅ FIX 1: correct variable name
      console.log(response);

      response.forEach((email) => {
        // ✅ FIX 2: use existing email service instead of undefined sender
        emailService.sendBasicEmail(
          "prasoon.rahul19@gmail.com",
          email.recipientEmail,
          email.subject,
          email.content
        )
        .then(async () => {
          console.log("Email sent successfully to", email.recipientEmail);

          // ✅ FIX 3: correct status spelling
          await emailService.updateTicket(email.id, { status: 'Success' });
        })
        .catch(async (err) => {
          console.log("Error occurred", err.message);

          await emailService.createNotificationTicket({
            subject: email.subject,
            content: email.content,
            recipientEmail: email.recipientEmail,
            status: 'Failed',
            notificationtime: new Date()
          });
        });
      });

      console.log("Running notification job every minute");

    } catch (err) {
      console.error("Cron failed:", err);
    }
  });
};

module.exports = setupNotificationJob;
