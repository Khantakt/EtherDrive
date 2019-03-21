pragma solidity ^0.5.0;

import "./EtherDrive.sol";

contract  EtherWheel is EtherDrive {

using SafeMath for uint256;

event SpinResults(uint userId, uint spinScore, uint spinCount, uint roundCount, uint roundScore, uint roundGoal);
event SpinLanding(uint spinresult);
event PlayerRewardPool(uint userId, uint rewardPool);

  uint randNonce = 0;
  uint roundOneGoal = 250;
  uint roundTwoGoal = 400;
  uint roundThreeGoal = 500;

  uint roundOneReward = 10;
  uint roundTwoReward = 20;
  uint roundThreeReward = 15;

  // Possible Spin Values
  uint8 twentyFive = 25;
  uint8 thirtyFive = 35;
  uint8 fifty = 50;
  uint8 seventyFive = 75;
  uint8 oneHundred = 100;
  uint8 oneFifty = 150;
  uint8 twoHundred = 200;


  function randMod() public returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(now, randNonce, msg.sender))) % 100;
  }



//   function spinWheel() public {
//     uint _randNum = randMod(100);
//     getRoundScore(_randNum);
//     emit RoundResults(_userId, spinPoints);
//   }

    // if(_roundScore >= _scoreToWin){
    //     if(roundNumber == 3){
    //         players[_userId].roundCount = 0;
    //     } else {
    //         addressToCreditBalance[_userAccount] = _roundReward;
    //     }
    // } else {
    //     players[_userId].roundCount = 0;
    //     players[_userId].paid = false;
    // }
    //  uint rewardPool = addressToCreditBalance[_userAccount];
    // emit PlayerRewardPool(_userId, rewardPool);

    function spinWheel() public {
        uint _userId = addressToId[msg.sender];
        players[_userId].spinCount++;
        uint randomNumber = randMod();
        uint spinScore = getRoundScore(randomNumber);
        players[_userId].roundScore = players[_userId].roundScore + spinScore;
        emit SpinResults(_userId, spinScore, players[_userId].spinCount, players[_userId].roundCount,players[_userId].roundScore, players[_userId].roundGoal);
        if(players[_userId].spinCount == 3) {
            if(players[_userId].roundCount == 1){
                evaluateRoundOne(_userId);
            } else if(players[_userId].roundCount == 2) {
                evaluateRoundTwo(_userId);
            }
        }
    }

    function evaluateRoundOne(uint _userId) public {
        if(players[_userId].roundScore < players[_userId].roundGoal) {
            players[_userId].owed = 0;
            players[_userId].roundCount = 0;
            players[_userId].spinCount = 0;
        } else {
            players[_userId].owed = players[_userId].owed + roundOneReward;
            players[_userId].roundCount++;
            players[_userId].roundGoal = roundTwoGoal;
            players[_userId].spinCount = 0;
        }
    }

     function evaluateRoundTwo(uint _userId) public {
        if(players[_userId].roundScore < players[_userId].roundGoal) {
            players[_userId].owed = 0;
            players[_userId].roundCount = 0;
            players[_userId].roundScore = 0;
        } else {
            players[_userId].owed = players[_userId].owed + roundTwoReward;
            players[_userId].roundCount++;
            players[_userId].roundGoal = roundThreeGoal;
            players[_userId].spinCount = 0;
            players[_userId].roundScore = 0;
        }
    }

    function getRoundScore(uint _spinNumber) public pure returns (uint){
      if (_spinNumber < 13) {
        return 25;
      } else if (_spinNumber >= 13 && _spinNumber < 25){
        return 35;
      } else if (_spinNumber >= 25 && _spinNumber < 42){
        return 50;
      } else if (_spinNumber >= 42 && _spinNumber < 59){
        return 75;
      } else if (_spinNumber >= 59 && _spinNumber < 71){
        return 100;
      } else if (_spinNumber >= 71 && _spinNumber < 83){
        return 150;
      } else if (_spinNumber >= 83 && _spinNumber < 88){
        return 250;
      } else if (_spinNumber > 88) {
        return (_spinNumber % 30) * 10;
      }
    }

// Functions for owner to set round goal amounts
    function setRoundOneGoal(uint _goal) external onlyOwner {
    roundOneGoal = _goal;
  }

  function setRoundTwoGoal(uint _goal) external onlyOwner {
    roundTwoGoal = _goal;
  }

  function setRoundThreeGoal(uint _goal) external onlyOwner {
    roundThreeGoal = _goal;
  }

// Functions for owner to change round reward amounts
  function setRoundOneReward(uint _reward) external onlyOwner {
    roundOneReward = _reward;
  }

  function setRoundTwoReward(uint _reward) external onlyOwner {
    roundTwoReward = _reward;
  }

  function setRoundThreeReward(uint _reward) external onlyOwner {
    roundThreeReward = _reward;
  }

//   Function for owner to change the price to play
    function setPriceToPlay(uint _price) external onlyOwner {
     priceToPlay = _price;
  }


    function createPlayer() public {
    uint userId = players.push(Player(msg.sender, 0, 0, 0, roundOneGoal, 0, false)) - 1 ;
    activated[msg.sender] = true;
    idToPlayer[userId] = msg.sender;
    addressToCreditBalance[msg.sender] = 0;
    addressToId[msg.sender] = userId;
    emit NewPlayer(userId);
  }


  }




  /* function firstspinWheel(uint _userId) external onlyOwnerOf(_userId) {
  Player storage currentPlayer = players[_userId];
  uint rand = randMod(100) + randMod(.1);
  if (rand <12.5) {
    roundCreditBalance = myZombie.winCount.add(1);
    myZombie.level = myZombie.level.add(1);
    enemyZombie.lossCount = enemyZombie.lossCount.add(1);
    feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
  } else {
    myZombie.lossCount = myZombie.lossCount.add(1);
    enemyZombie.winCount = enemyZombie.winCount.add(1);
    _triggerCooldown(myZombie);
  }
} */
