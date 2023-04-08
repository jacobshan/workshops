import { ethers } from 'ethers';
import { createInstance } from './forwarder';
import { signMetaTxRequest } from './signer';

async function sendTx(sushiCutie, tokenID) {
  console.log(`Sending mint tx to mint tokenID=${tokenID}`);
  return sushiCutie.mint(tokenID);
}

async function sendMetaTx(sushiCutie, provider, signer, tokenID) {
  console.log(`Sending mint meta-tx to mint tokenID=${tokenID}`);
  const url = process.env.REACT_APP_WEBHOOK_URL;
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  const data = sushiCutie.interface.encodeFunctionData('mint', [tokenID, 1]);
  const to = sushiCutie.address;
  
  const request = await signMetaTxRequest(signer.provider, forwarder, { to, from, data });

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function mintSushi(sushiCutie, provider, tokenID) {
  if (!tokenID) throw new Error(`tokenID cannot be empty`);
  if (!window.ethereum) throw new Error(`User wallet not found`);

  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 80001) throw new Error(`Please switch to Mumbai for signing`);

  const signer = userProvider.getSigner();
  const from = await signer.getAddress();
  const balance = await provider.getBalance(from);
  
  const canSendTx = balance.gt(1e15);
  if (canSendTx) return sendTx(sushiCutie.connect(signer), tokenID);
  else return sendMetaTx(sushiCutie, provider, signer, tokenID);
}
