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
   mapping(address => uint8) activated;
   mapping(uint => address) idToPlayer;
   mapping(address => uint) addressToId;


   modifier onlyPlayer(uint _userId) {
    require(msg.sender == idToPlayer[_userId]);
    _;
  }

   function _createPlayer() public {
    address account = msg.sender;
    require(activated[msg.sender] == 0);
    uint userId = players.push(Player(account,  0, 0, false)) - 1 ;
    activated[msg.sender] = 1;
    idToPlayer[userId] = msg.sender;
    idToCreditBalance[userId] = 0;
    addressToId[msg.sender] = userId;
    emit NewPlayer(userId);
  }

    function deposit(uint256 _amount) payable public {
        require(msg.value == _amount);
    }

    function payToPlay () public payable {
         require (msg.value == priceToPlay);
         }
}
