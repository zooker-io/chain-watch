import { InfuraProvider } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import ERC721SeaDropABI from "../abis/ERC721SeaDrop.json"
import { ERC721SeaDrop } from "../abis/types"

export async function useContractInfo(chainID:number,txHash:string){  
    const INFURA_KEY=process.env.REACT_APP_INFURA_KEY
    const provider = new InfuraProvider("goerli",INFURA_KEY)
    const receipt= await provider.getTransactionReceipt(txHash)
    const erc721:ERC721SeaDrop=new Contract(receipt.contractAddress, ERC721SeaDropABI.abi, provider) as unknown as ERC721SeaDrop
    const name=await erc721.name()
    const symbol=await erc721.symbol()
    return {name,symbol,contract_address:receipt.contractAddress,from_address:receipt.from,chain_id:chainID,chain_identifier:"goerli"}

}