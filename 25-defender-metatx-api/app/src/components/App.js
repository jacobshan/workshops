import { EthereumContext } from '../eth/context';
import { createProvider } from '../eth/provider';
import { createInstance } from '../eth/sushiCutie';

import './App.css';

import Mint from './Mint';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const provider = createProvider();
  const sushiCutie = createInstance(provider);
  const ethereumContext = { provider, sushiCutie };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mint Sushi</h1>
        <p>powered by Defender Relayer meta-transactions</p>
      </header>
      <section className="App-content">
        <EthereumContext.Provider value={ethereumContext}>
          <Mint />
        </EthereumContext.Provider>
      </section>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}

export default App;
