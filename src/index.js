const express = require('express');

const bodyParser = require('body-parser');
const app  = express();

const {PORT} = require('./config/ServerConfig')
const {sendBasicEmail} = require('./services/email-service')
// const cron = require('node-cron');

const TicketController = require('./controllers/ticket-controller');

const jobs = require('./utils/job');
const amqplib = require('amqplib');
const emailService = require('./services/email-service');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, REMINDER_BINDING_KEY } = require('./config/ServerConfig');

async function startConsumer() {
  if (!MESSAGE_BROKER_URL) return;
  const connection = await amqplib.connect(MESSAGE_BROKER_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
  const queue = await channel.assertQueue('reminder', { durable: true });
  await channel.bindQueue(queue.queue, EXCHANGE_NAME, REMINDER_BINDING_KEY);
  channel.consume(queue.queue, async message => {
    if (!message) return;
    try {
      const event = JSON.parse(message.content.toString());
      if (event.service !== 'CREATE_TICKET' || !event.data) throw new Error('Invalid notification event');
      await emailService.createNotificationTicket(event.data);
      channel.ack(message);
    } catch (error) { console.error('Notification event failed:', error.message); channel.nack(message, false, false); }
  });
}

const setupAndStartServer = ()=>{
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}));

  // as this is not a big serive wee are putting routes here only instead of creating a new file for routes
   app.post('/api/v1/tickets' , TicketController.create );
  
   app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`);
    jobs();
    startConsumer().catch(error => console.error('RabbitMQ consumer unavailable:', error.message));
    // sendBasicEmail(
    //     'prasoon.rahul19@gmail.com',
    //     'prasoon.rahulkumar19@gmail.com',
    //     'testing mail ',
    //     'this is test.'
    // );
    // cron.schedule('*/2 * * * *', () => {
    //     console.log('running a task every two minutes');
      // });
});
}

setupAndStartServer();

// sanskars12363@gmail.com
