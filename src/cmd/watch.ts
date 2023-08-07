
const amqp = require("amqplib");
import  { Message } from 'amqplib/callback_api'
import dotenv from "dotenv";
import { useContractInfo } from '../hooks/useContract';

dotenv.config();
const AMQP_URL=process.env.AMQP_URL
const queue="evm_erc721_contract_deployed_event";

(async () => {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();
    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: true });
    await channel.consume(queue, async (message:Message) => {
       
      console.log(message.content.toString());
      var msg = JSON.parse(message.content.toString()) 
      if (msg.chain_type=="evm"){
        try {
        const result=await useContractInfo(msg.chain_id,msg.transaction_hash)
        if(message.properties.replyTo){
          channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({data:{...result,transaction_hash:msg.transaction_hash},event:"erc721_contract_deployed_response"})));
          console.log("reply to",message.properties.replyTo);
          
        }
      }catch (error:any) {
        console.log(error.reason)
      }
      }
      channel.ack(message);
        
      }, { noAck: false });
  
    console.log(' [x] To exit press CTRL+C.');
  
  })();