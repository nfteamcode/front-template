import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import HelloNft from '../../artifacts/contracts/HelloNft.sol/HelloNft.json';
import Header from './Header';
import Minter from './Minter';
import Footer from "./Footer";

import './mintPage.scss';

function MintPage() {
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState({});
  const [userAccount, setUserAccount] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const HelloNftAddress = '0x777C3e723912C2FB05353677d9B072F8b8F6B42E';

  const fetchData = async() => {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0x4") {
        return setErrors({
          code: 2000,
          msg: "Wrong network, please switch to rinkeby chain.",
        });
        
      } else if (!chainId) {
        return setErrors({code: 3000, msg: "Unable to fetch your network."});
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(HelloNftAddress, HelloNft.abi, provider);

      let connectedAccount = await window.ethereum.selectedAddress;
      if (connectedAccount) {
        setUserAccount(connectedAccount);
      } else { setErrors({code: 1001, msg: ''})}
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const obj = {
          cost: String(cost),
          totalSupply:  String(totalSupply),
        }
        setData(obj);
      } catch (err) {
        setErrors({
          code: 1000,
          msg: "An error occur, please refresh browser or try later.",
        });
      }
    }
  }

  const handleMint = async(quantity) => {
    if (typeof window.ethereum !== 'undefined') { 
      if (!userAccount) {
        return setErrors({ code: 1002, msg: "Please connect your wallet before mint" });
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(HelloNftAddress, HelloNft.abi, signer);

      try {
        let overrides = {
          from: userAccount,
          value: String(Number(data.cost)*quantity),
        }
        const tx = await contract.mint(quantity, overrides);
        await tx.wait();
        setErrors(null);
        fetchData();
       
      } catch (err) {
        setErrors({ code: err.code, msg: err.message });
        return err;
      }
    }
  }

  const handleConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        })
        .then(async(permissions) => {
           let account = await window.ethereum.request({
             method: "eth_requestAccounts",
           });
          if (account) {
            setErrors(null);
            setUserAccount(account[0]);
          } else {
            setErrors({code: 1000, msg: "Unable to fetch your account."})
          }
          
          console.log(permissions);
          const accountsPermission = permissions.find(
            (permission) => permission.parentCapability === "eth_accounts"
          );
          if (accountsPermission) {
            console.log("eth_accounts permission successfully requested!");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrors({ code: err.code, msg: err.message });
          return err
        });
    } else {
      setErrors({
        code: 1001,
        msg: "No wallet detected, please install metamask.",
      });
    }
  };
  
  window.ethereum.on("chainChanged", chainId => {
    if (chainId === "0x4") {
     window.location.reload();
    } else {
      setErrors({
        code: 2000,
        msg: "Wrong network, please switch to rinkeby chain.",
      });
    }
  });

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts[0] !== userAccount) {
      setUserAccount(accounts[0]);
    };
  });

  return (
    <div className="mint">
      <div className="mint__container">
        <Header HandleConnect={handleConnect} UserAddress={userAccount} />
        {errors && <p className="error">{errors.msg}</p>}
        <Minter
          Data={data}
          Errors={errors}
          FetchData={fetchData}
          HandleMint={handleMint}
          HandleConnect={handleConnect}
        />
        <Footer />
      </div>
    </div>
  );
}

export default MintPage;
