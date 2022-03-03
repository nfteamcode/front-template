import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import './minter.scss'

function Minter(props) { 
  const [quantity, setQuantity] = useState(1);
  const data = props.Data;
  const handleMint = props.HandleMint;
  const errors = props.Errors;
  const handleConnect = props.HandleConnect;

  useEffect(() => {
    
  }, []);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity <  4) {
      setQuantity(quantity + 1);
    }
  };

  const _handleMint = async () => {
    await handleMint(quantity).then((res) => {
      console.log(res);
    })
  };

  const _handleConnect = async () => {
    await handleConnect().then((res) => {
      console.log(res);
    });
  };

  if (errors) {
     console.log("errors", typeof errors.code);
  }
 
  return (
    <div className="minter">
      <h1 className="minter__title">Minting is live!</h1>
      <p className="minter__count">{data.totalSupply} /40</p>
      <div className="minter__container">
        <div className="minter__button__container">
          <Button
            className="minter__amount minter__quantity"
            variant="outlined"
            onClick={handleDecrease}
          >
            -
          </Button>
          <input
            className="minter__amount"
            type="number"
            min="1"
            max="4"
            labelid="quantity"
            id="minter__input"
            value={quantity}
            label="Quantity"
            onChange={handleChange}
          />
          <Button
            className="minter__amount minter__quantity"
            variant="outlined"
            onClick={handleIncrease}
          >
            +
          </Button>
        </div>
        <p className="minter__total">
          Mint {quantity} HelloNft for{" "}
          {((data.cost / 10 ** 18) * quantity).toFixed(2)} eth (excluding gas
          fee)
        </p>
        {!errors || errors.code === 4001 ? (
            <Button
              fullWidth
              className="minter__trigger"
              variant="contained"
              onClick={_handleMint}
            >
              Buy HelloNft
            </Button>
          ):(null)}
      </div>
    </div>
  );
}

export default Minter;