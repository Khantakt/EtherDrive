pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./SafeMath.sol";

contract EtherDrive is Ownable{

  event NewPlayer(uint userId);

  struct Player {
    address account;
    uint roundCount;
    uint roundScore;
    bool paid;
  }


    uint priceToPlay = 10;


  Player[] public players;

   mapping(address => uint) balanceOf;
   mapping(uint => uint) idToCreditBalance;
   mapping(address => bool) activated;
   mapping(uint => address) idToPlayer;
   mapping(address => uint) addressToId;


   modifier onlyPlayer(uint _userId) {
    require(msg.sender == idToPlayer[_userId]);
    _;
  }

   function createPlayer() public {
    uint userId = players.push(Player(msg.sender,  0, 0, false)) - 1 ;
    activated[msg.sender] = true;
    idToPlayer[userId] = msg.sender;
    idToCreditBalance[userId] = 0;
    addressToId[msg.sender] = userId;
    emit NewPlayer(userId);
  }

    function deposit(uint256 _amount) payable public {
        require(msg.value == _amount);
    }
// /* Only owner of contract can withdraw */
//     function withdraw() external onlyOwner {
//     address _owner = owner();
//     _owner.transfer(address(this).balance);
//   }

/* Need to customize this to changing priceToPlay, roundGoals and roundRewards */
  /* function setLevelUpFee(uint _fee) external onlyOwner {
      levelUpFee = _fee;
    } */

    function payToPlay () public payable {
        require (msg.value == priceToPlay);
         }

    function getCreditedAmount(uint _userId) public view returns (uint){
        return idToCreditBalance[_userId];
    }

    function getRoundCount(uint _userId) public view returns (uint) {
        return players[_userId].roundCount;
    }

    function isAccountActivated() public view returns (bool){
        return (activated[msg.sender]);
    }

    function getPlayerId() public view returns (uint) {
        return addressToId[msg.sender];
    }

}
