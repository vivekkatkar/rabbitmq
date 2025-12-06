import amqp, { connect } from "amqplib"

const num = process.argv[2] || 10;
const msg = {number : num};

start_connection();

async function start_connection(){
    try{
        const conn = await amqp.connect("amqp://localhost:5672");
        
        const channel = await conn.createChannel();
        const result = await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully : ${JSON.stringify(msg)}`);
    }catch(ex){
        console.error(ex)
    }
}
