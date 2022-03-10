import React from 'react';

import Button from "@mui/material/Button";
import './header.scss';
import demoImg from '../../../img/zeus.png';

function Header(props) {

  const handleConnect = props.HandleConnect;
  let userAddress;
  if (props.UserAddress) {
    console.log(props.UserAddress)
    userAddress = props.UserAddress.substring(0, 8);
  };

  return (
    <div className="header_container">
      <div className="header_title_container">
        <h1 className="header_title">Welcome to D£US mint page!</h1>
        <Button onClick={() => handleConnect()} className="header_metamask">
          {!userAddress ? "Connect wallet" : `${userAddress}...`}
        </Button>
      </div>
      <div className="header_banner">
        <img src={demoImg} alt="img" />
        <img src={demoImg} alt="img" />
        <img src={demoImg} alt="img" />
        <img src={demoImg} alt="img" />
        <img src={demoImg} alt="img" />
        <img src={demoImg} alt="img" />
        <img className={"mobHidden"} src={demoImg} alt="img" />
        <img className={"mobHidden"} src={demoImg} alt="img" />
        <img className={"mobHidden"} src={demoImg} alt="img" />
        <img className={"mobHidden"} src={demoImg} alt="img" />
      </div>
    </div>
  );
}

export default Header;