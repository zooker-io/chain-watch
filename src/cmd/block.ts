const amqp = require("amqplib");
import { InfuraProvider } from "@ethersproject/providers"
const provider = new InfuraProvider("goerli",process.env.REACT_APP_INFURA_KEY)
provider.on("block", (blockNumber) => {
    console.log(blockNumber)
})
