const amqp = require("amqplib");
import dotenv from "dotenv";
import { InfuraProvider } from "@ethersproject/providers"

dotenv.config();
const provider = new InfuraProvider("goerli",process.env.REACT_APP_INFURA_KEY)
provider.on("block", (blockNumber) => {
    console.log(blockNumber)
})
