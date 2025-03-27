const amqp = require('amqplib')
const config = require('../configs/rabbit')
const { mailProcessor } = require('../processors');

const processors = {
    "sendMail": mailProcessor.sendMail
};
class Consumer {
    async consumeMessage() {
        const connection = await amqp.connect(config.rabbitMQ.url)
        const channel = await connection.createChannel();

        await channel.assertExchange("mailExchange", "direct");

        const q = await channel.assertQueue("MailQueue");
         
        console.log('✌️q.queue --->', q.queue);
        await channel.bindQueue(q.queue, "mailExchange", "Mail");

        channel.consume(q.queue, async (msg) => {
            console.log(msg)

            const handle_processor = processors[msg?.properties?.type];
            if (handle_processor) {
                try {
                    const data = JSON.parse(msg?.content?.toString());
                    console.log("DATATAATATATA", data.message);
                    await handle_processor(data.message);
                    channel.ack(msg);
                } catch (error) {
                    console.log(error.message);
                    channel.nack(msg, false, false);
                }
            } else {
                console.log(`Messages ignore with id: ${msg?.properties?.messageId}`);
                channel.nack(msg, false, false);
            }
        });
    }

}
module.exports = Consumer;