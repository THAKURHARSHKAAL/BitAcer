import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

interface Web3ContextType {
  account: string | null;
  provider: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions: {},
    });
    setWeb3Modal(web3Modal);
  }, []);

  const connect = async () => {
    try {
      if (web3Modal) {
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const accounts = await provider.listAccounts();
        
        setProvider(provider);
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = async () => {
    try {
      if (web3Modal) {
        await web3Modal.clearCachedProvider();
        setAccount(null);
        setProvider(null);
      }
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <Web3Context.Provider value={{ account, provider, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);
