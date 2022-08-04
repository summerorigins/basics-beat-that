// there are 2 players (player as a global variable)
// when player clicks submit, 2 dice gets rolled
// player chooses order of dice
// bigger number wins

//gamemode
//options: dice roll, dice order
let gameMode = "diceRoll";
//total number of players
let playerAmt = 2;
//current player that's playing
let playerCurrent = 1;
//number of dice
let diceNumber = 2;
// //individual dice roll result
// let diceRollResult = [];
//2 player mode numbers:
let p1Number = [];
let p2Number = [];

//helper function: dice rolls
//setting up randomization
var randomInt = function () {
  return Math.ceil(Math.random() * 6);
};

//push random number
var randomDiceRoll = function () {
  let diceRollCount = 0;
  let newDiceRolls = [];
  while (diceRollCount < diceNumber) {
    //push random integer to newDiceRolls array
    newDiceRolls.push(randomInt());

    //increase dice roll count
    diceRollCount++;
  }

  if (playerCurrent == 1) {
    p1Number = newDiceRolls;
  } else if (playerCurrent == 2) {
    p2Number = newDiceRolls;
  }
  return newDiceRolls;
};

//combine numbers from roll
var combineNumbers = function (num1, num2) {
  let combinedNumbers = Number(`${num1}${num2}`);

  return combinedNumbers;
};

//let players rearrange numbers
var getPlayerNum = function (chosenIndex) {
  var finalArray;
  if (playerCurrent == 1) {
    finalArray = p1Number;
  } else if (playerCurrent == 2) {
    finalArray = p2Number;
  }

  var playerNum;
  if (chosenIndex == 1) {
    playerNum = combineNumbers(finalArray[0], finalArray[1]);
  } else if (chosenIndex == 2) {
    playerNum = combineNumbers(finalArray[1], finalArray[0]);
  }

  //store to each player's  number
  if (playerCurrent == 1) {
    p1Number = playerNum;
  } else if (playerCurrent == 2) {
    p2Number = playerNum;
  }

  console.log(`p1 number: ${p1Number}, p2 number: ${p2Number}`);
  return playerNum;
};

//get winner
var getWinner = function () {
  if (p1Number < p2Number) {
    return `🎉<b>CONGRATULATIONS!</b>🎉</br>Player 2, You Won!`;
  }
  return `🎉<b>CONGRATULATIONS!</b>🎉</br>Player 1, You Won!`;
};

var main = function (input) {
  // get the dice rolling
  if (gameMode == `diceRoll`) {
    var newRoll = randomDiceRoll();
    gameMode = `diceOrder`;
    return `<h2><b>🥁🥁 Drumrolls 🥁🥁</b></h2> <br> Your dice rolls are: ${newRoll} <br> Now, Please Enter 1️⃣ or 2️⃣ to select which number you want to go first!`;
  }

  //pick dice order
  if (gameMode == `diceOrder`) {
    let firstNum = input;
    if (firstNum != 1 && firstNum != 2) {
      return `<h2>Please Enter 1️⃣ or 2️⃣ to proceed.</h2>`;
    }
    //get final number (contecated)
    var playerNum = getPlayerNum(firstNum);

    //switch players
    if (playerCurrent == 1) {
      playerCurrent++;
      gameMode = `diceRoll`;
      return `<h2>Player 1's final number is <b>${playerNum}</b></h2> <br><br>Player 2, it's your turn! <br>May luck be with you 🍀`;
    }

    var winner = getWinner();
    playerCurrent = 1;
    gameMode = `diceRoll`;
    return `<h2>${winner}</h2>Player One: ${p1Number}<br>Player Two: ${p2Number}`;
  }

  return `if you reached this point, something has gone wrong in main`;
};
