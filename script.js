/*
  Rock Paper Scissors 🚀🔥
  Concepts covered in this project
    👉 For loops
    👉 Dom Manipulation
    👉 Variables
    👉 Conditionals (if else if)
    👉 Template Literals
    👉 Event Listeners
    👉 Higher order Function (Math.random())
*/

// ** getComputerChoice randomly selects between `Rock` `Paper` `Scissors` and returns that string **
// getComputerChoice() 👉 'Rock'
// getComputerChoice() 👉 'Paper'
// getComputerChoice() 👉 'Scissors'

let totalScore = {
  playerscore: 0,
  computerScore: 0
}

const getComputerChoice = () => {
  let rpsChoice = ['Rock', 'Paper', 'Scissors'];
  let cmpChoice = Math.floor(Math.random() * 3);
  return rpsChoice[cmpChoice];
}

// ** getResult compares playerChoice & computerChoice and returns the score accordingly **
// human wins - getResult('Rock', 'Scissors') 👉 1
// human loses - getResult('Scissors', 'Rock') 👉 -1
// human draws - getResult('Rock', 'Rock') 👉 0
const getResult = (playerChoice, computerChoice) => {
  // return the result of score based on if you won, drew, or lost
  let score;

  // All situations where human draws, set `score` to 0
  if (playerChoice == computerChoice) {
    score = 0;
  }

  // All situations where human wins, set `score` to 1
  else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
    score = 1;
  }
  else if (playerChoice == 'Paper' && computerChoice == 'Rock') {
    score = 1;
  }
  else if (playerChoice == 'Scissors' && computerChoice == 'Paper') {
    score = 1;
  }
  // make sure to use else ifs here


  // Otherwise human loses (aka set score to -1)
  else {
    score = -1;
  }

  // return score
  return score;

}

// ** showResult updates the DOM to `You Win!` or `You Lose!` or `It's a Draw!` based on the score. Also shows Player Choice vs. Computer Choice**
const showResult = (score, playerChoice, computerChoice) => {
  // Hint: on a score of -1
  // You should do result.innerText = 'You Lose!'
  // Don't forget to grab the div with the 'result' id!
  resultDiv = document.getElementById("result");
  handsDiv = document.getElementById("hands");
  playerScoreDiv = document.getElementById('player-score');

  if (score == 0) {
    resultDiv.innerText = "It's a tie!";
  } else if (score == 1) {
    resultDiv.innerText = "You Win!";
  } else {
    resultDiv.innerText = "You Lose!";
  }
  handsDiv.innerText = `🧑‍🦰${playerChoice} VS 🤖${computerChoice}`;
  playerScoreDiv.innerText = `Your score is: ${score}`;
}

// ** Calculate who won and show it on the screen **
const onClickRPS = (playerChoice) => {
  console.log({ playerChoice });
  let computerChoice = getComputerChoice();
  console.log({ computerChoice });
  const score = getResult(playerChoice, computerChoice);
  console.log({ score });
  showResult(score, playerChoice, computerChoice);
}


//Work on saving and showing playerScore and computerScore in an object and the DOM.
/*const totalGameScore = () => {
  let score;
  if (score > 0) {
    totalScore['playerChoice'] += 1;
  }
  else if (score < 0) {
    totalScore['computerChoice'] += 1;
  }
  else {
    return
  }
}

let finalScore = totalGameScore();
console.log(finalScore);*/


// ** Make the RPS buttons actively listen for a click and do something once a click is detected **
const playGame = () => {
  // use querySelector to select all RPS Buttons
  const rpsButtons = document.querySelectorAll(".rpsButton");
  rpsButtons[0].onclick = () => console.log(rpsButtons[0].value);

  // * Adds an on click event listener to each RPS button and every time you click it, it calls the onClickRPS function with the RPS button that was last clicked *
  rpsButtons.forEach(rpsButton => {
    rpsButton.onclick = () => onClickRPS(rpsButton.value);
  }
  )
  endGameButton = document.getElementById("endGameButton");
  endGameButton.onclick = () => endGame(totalScore);
  // 1. loop through the buttons using a forEach loop
  // 2. Add a 'click' event listener to each button
  // 3. Call the onClickRPS function every time someone clicks
  // 4. Make sure to pass the currently selected rps button as an argument



  // Add a click listener to the end game button that runs the endGame() function on click

}

// ** endGame function clears all the text on the DOM **
const endGame = (totalScore) => {
  totalScore["playerScore"] = 0;
  totalScore["computerScore"] = 0;
  
  resultDiv = document.getElementById("result");
  handsDiv = document.getElementById("hands");
  playerScoreDiv = document.getElementById('player-score');

  resultDiv.innerText = '';
  handsDiv.innerText = '';
  playerScoreDiv.innerText = '';
}

playGame()