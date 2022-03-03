import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Button from "@mui/material/Button";

import './header.scss';

import img1 from '../../img/1.png';
import img2 from "../../img/2.png";
import img3 from "../../img/3.png";
import img4 from "../../img/4.png";
import img5 from "../../img/5.png";
import img6 from "../../img/6.png";
import img7 from "../../img/7.png";
import img8 from "../../img/8.png";
import img9 from "../../img/9.png";
import img10 from '../../img/10.png';

function Header(props) {
  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
   
  }, [])

  const handleConnect = props.HandleConnect;
  let userAddress;
  if (props.UserAddress) {
    console.log(props.UserAddress)
    userAddress = props.UserAddress.substring(0, 8);
  };

  return (
    <div className="header_container">
      <div className="header_title_container">
        <h1 className="header_title">Welcome to HelloNft!</h1>
        <Button onClick={() => handleConnect()} className="header_metamask">
          {!userAddress
            ? "Connect wallet"
            : `${userAddress}...`}
        </Button>
      </div>
      <div className="header_banner">
        <img src={img1} alt="img" />
        <img src={img2} alt="img" />
        <img src={img3} alt="img" />
        <img src={img4} alt="img" />
        <img src={img5} alt="img" />
        <img src={img6} alt="img" />
        <img src={img7} alt="img" />
        <img src={img8} alt="img" />
        <img src={img9} alt="img" />
        <img src={img10} alt="img" />
      </div>
    </div>
  );
}

export default Header;