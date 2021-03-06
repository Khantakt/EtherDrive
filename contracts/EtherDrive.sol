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
   mapping(address => uint) addressToCreditBalance;
   mapping(address => bool) activated;
   mapping(uint => address) idToPlayer;
   mapping(address => uint) addressToId;


   modifier onlyPlayer(uint _userId) {
    require(msg.sender == idToPlayer[_userId]);
    _;
  }

  function createPlayer() public {
    require(activated[msg.sender] != true);
    address _userAccount = msg.sender;
    uint userId = players.push(Player(_userAccount,  0, 0, false)) - 1 ;
    activated[_userAccount] = true;
    idToPlayer[userId] = _userAccount;
    addressToCreditBalance[_userAccount] = 0;
    addressToId[_userAccount] = userId;
    emit NewPlayer(userId);
  }

//   function testCreatePlayer(address _userAccount) public {
//     uint userId = players.push(Player(_userAccount,  0, 0, false)) ;
//     emit NewPlayer(userId);
//   }

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

     function testConnection () public pure returns (uint){
        return 100;
         }

    function payToPlay () public payable {
        require (msg.value == priceToPlay);
         }

    function getCreditedAmount() public view returns (uint){
        return addressToCreditBalance[msg.sender];
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

    function getPriceToPlay() public view returns (uint) {
        return priceToPlay;
    }

}
