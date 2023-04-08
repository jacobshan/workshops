import { useRef, useState, useContext } from 'react';
import { mintSushi } from '../eth/mint';
import { EthereumContext } from "../eth/context";
import { toast } from 'react-toastify';
import './Register.css';

function Mint() {
  const tokenIDInput = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const { sushiCutie, provider } = useContext(EthereumContext);

  const sendTx = async (event) => {
    event.preventDefault();
    const tokenID = tokenIDInput.current.value;
    setSubmitting(true);
    
    try {
      const response = await mintSushi(sushiCutie, provider, tokenID);
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://mumbai.polygonscan.com/tx/${hash}`)
        : undefined;
      toast('Transaction sent!', { type: 'info', onClick });
      tokenIDInput.current.value = '';
    } catch(err) {
      toast(err.message || err, { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="Container">
    <form onSubmit={sendTx}>
      <input required={true} placeholder="Mint your SushiCutie here" ref={tokenIDInput}></input>
      <button type="submit" disabled={submitting}>{submitting ? 'Minting...' : 'Mint'}</button>
    </form>
  </div>
}

export default Mint;