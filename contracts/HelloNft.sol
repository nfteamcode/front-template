// SPDX-License-Identifier: GPL-3.0

// Created by HashLips
// The Nerdy Coder Clones

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";

contract HelloNft is ERC721A, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.07 ether;
  uint256 public maxSupply = 40;
  uint256 public maxMintAmount = 4;
  bool public paused = false;
  mapping(address => bool) public whitelisted;

   constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI) ERC721A(_name, _symbol) {
    setBaseURI(_initBaseURI);
    _safeMint(msg.sender, 4);
   }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(uint256 _quantity) external payable {
    uint256 supply = totalSupply();
    require(!paused);
    require(_quantity > 0);
    require(_quantity <= maxMintAmount);
    require(supply + _quantity <= maxSupply);

    if (msg.sender != owner()) {
        if(whitelisted[msg.sender] != true) {
          require(msg.value >= cost * _quantity);
        }
    }
    _safeMint(msg.sender, _quantity);
  }

//   function walletOfOwner(address _owner)
//     public
//     view
//     returns (uint256[] memory)
//   {
//     uint256 ownerTokenCount = balanceOf(_owner);
//     uint256[] memory tokenIds = new uint256[](ownerTokenCount);
//     for (uint256 i; i < ownerTokenCount; i++) {
//       tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
//     }
//     return tokenIds;
//   }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }
 
 function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
 
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }

  function withdraw() public payable onlyOwner {
    require(payable(msg.sender).send(address(this).balance));
  }
}