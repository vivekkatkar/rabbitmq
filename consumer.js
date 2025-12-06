import amqp, { connect } from "amqplib"

start_connection();

async function start_connection(){
    try{
        const conn = await amqp.connect("amqp://localhost:5672");
        
        const channel = await conn.createChannel();
        channel.consume("jobs", (msg) => {
            const data = msg.content.toString();
            console.log(data);

            // channel.ack(msg);
        });
    }catch(ex){
        console.error(ex)
    }
}
