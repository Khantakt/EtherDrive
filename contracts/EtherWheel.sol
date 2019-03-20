pragma solidity ^0.5.0;

import "./EtherDrive.sol";

contract  EtherWheel is EtherDrive {

using SafeMath for uint256;

event RoundResults(uint userId, uint roundNumber, uint spinOne, uint spinTwo, uint spinThree, uint roundScore);
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


  function randMod(uint _modulus) internal returns(uint) {
    randNonce = randNonce.add(1);
    return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
  }


  function spinWheel(uint _userId, uint _scoreToWin, uint _roundReward) internal {
    Player storage currentPlayer = players[_userId];
    idToCreditBalance[_userId] = 0;
    currentPlayer.roundCount = currentPlayer.roundCount.add(1);
    uint roundNumber = currentPlayer.roundCount;
    uint roundReward = _roundReward;
    uint spinOnePoints = getRoundScore(randMod(100));
    uint spinTwoPoints = getRoundScore(randMod(100));
    uint spinThreePoints = getRoundScore(randMod(100));
    uint _roundScore = spinOnePoints + spinTwoPoints + spinThreePoints;

    emit RoundResults(_userId, roundNumber, spinOnePoints, spinTwoPoints, spinThreePoints, _roundScore);
    if(_roundScore >= _scoreToWin){
        if(roundNumber == 3){
            currentPlayer.roundCount = 0;
            currentPlayer.paid = false;

        } else {
            idToCreditBalance[_userId] = roundReward;
        }
    } else {
        currentPlayer.roundCount = 0;
        currentPlayer.paid = false;
    }
    uint rewardPool = idToCreditBalance[_userId];
    emit PlayerRewardPool(_userId, rewardPool);
    }


    function checkRound(address _account) public {
        require(msg.sender == _account);
        uint _userId = addressToId[msg.sender];
        if(_userId == 0){
            createPlayer();
        }
         Player storage currentPlayer = players[_userId];
        if(currentPlayer.roundCount ==  0) {
        spinWheel(_userId, roundOneGoal, roundOneReward);
      } else if(currentPlayer.roundCount ==  1) {
        spinWheel(_userId, roundTwoGoal, roundTwoReward);
      } else if(currentPlayer.roundCount ==  2) {
        spinWheel(_userId, roundThreeGoal, roundThreeReward);
      }
    }

    function getRoundScore(uint _spinNumber) private returns (uint){
        emit SpinLanding(_spinNumber);
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
      } else {
        return randMod(30).mul(10);
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
