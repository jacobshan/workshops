/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';

const CLOUDFLARE_ENDPOINT = 'https://polygon-mumbai.g.alchemy.com/v2/xj1U7k2wTtIpXG00pfUdWBAEANb-JAs0';
const MAIN_ENDPOINT = 'https://polygon-mumbai.g.alchemy.com/v2/xj1U7k2wTtIpXG00pfUdWBAEANb-JAs0';
const ALTERNATE_ENDPOINT = 'https://polygon-mumbai.g.alchemy.com/v2/xj1U7k2wTtIpXG00pfUdWBAEANb-JAs0';
const UNSECURE_ENDPOINT = 'https://polygon-mumbai.g.alchemy.com/v2/xj1U7k2wTtIpXG00pfUdWBAEANb-JAs0';
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

export function createProvider() {  
  return new ethers.providers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 80001);
}