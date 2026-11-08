/**
 * Rock Paper Scissors with Explicit GameState FSM
 */

const GameState = Object.freeze({
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  ROUND_RESOLVED: 'ROUND_RESOLVED',
  GAME_ENDED: 'GAME_ENDED'
});

class GameFSM {
  constructor() {
    this.state = GameState.IDLE;
    this.validTransitions = {
      [GameState.IDLE]: [GameState.PLAYING],
      [GameState.PLAYING]: [GameState.ROUND_RESOLVED, GameState.GAME_ENDED],
      [GameState.ROUND_RESOLVED]: [GameState.PLAYING, GameState.GAME_ENDED],
      [GameState.GAME_ENDED]: [GameState.IDLE, GameState.PLAYING]
    };
  }

  transitionTo(nextState) {
    if (this.state === nextState) return;
    const allowed = this.validTransitions[this.state] || [];
    if (!allowed.includes(nextState)) {
      console.warn(`[GameFSM] Illegal transition from ${this.state} to ${nextState}`);
      return;
    }
    this.state = nextState;
  }
}

const gameFSM = new GameFSM();

const totalScore = {
  playerScore: 0,
  computerScore: 0
};

const getComputerChoice = () => {
  const rpsChoice = ['Rock', 'Paper', 'Scissors'];
  const cmpChoice = Math.floor(Math.random() * 3);
  return rpsChoice[cmpChoice];
};

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 0;
  } else if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return 1;
  } else {
    return -1;
  }
};

const showResult = (score, playerChoice, computerChoice) => {
  const resultDiv = document.getElementById("result");
  const handsDiv = document.getElementById("hands");
  const playerScoreDiv = document.getElementById('player-score');

  if (!resultDiv || !handsDiv || !playerScoreDiv) return;

  if (score === 0) {
    resultDiv.innerText = "It's a tie!";
  } else if (score === 1) {
    resultDiv.innerText = "You Win!";
  } else {
    resultDiv.innerText = "You Lose!";
  }

  handsDiv.innerText = `🧑‍🦰 ${playerChoice} VS 🤖 ${computerChoice}`;
  playerScoreDiv.innerText = `Player: ${totalScore.playerScore} | Computer: ${totalScore.computerScore}`;
};

const onClickRPS = (playerChoice) => {
  gameFSM.transitionTo(GameState.PLAYING);
  const computerChoice = getComputerChoice();
  const score = getResult(playerChoice, computerChoice);

  if (score === 1) {
    totalScore.playerScore += 1;
  } else if (score === -1) {
    totalScore.computerScore += 1;
  }

  gameFSM.transitionTo(GameState.ROUND_RESOLVED);
  showResult(score, playerChoice, computerChoice);
};

const endGame = () => {
  gameFSM.transitionTo(GameState.GAME_ENDED);
  totalScore.playerScore = 0;
  totalScore.computerScore = 0;

  const resultDiv = document.getElementById("result");
  const handsDiv = document.getElementById("hands");
  const playerScoreDiv = document.getElementById('player-score');

  if (resultDiv) resultDiv.innerText = '';
  if (handsDiv) handsDiv.innerText = '';
  if (playerScoreDiv) playerScoreDiv.innerText = '';

  gameFSM.transitionTo(GameState.IDLE);
};

const playGame = () => {
  const rpsButtons = document.querySelectorAll(".rpsButton");
  rpsButtons.forEach(button => {
    button.onclick = () => onClickRPS(button.value);
  });

  const endGameButton = document.getElementById("endGameButton");
  if (endGameButton) {
    endGameButton.onclick = () => endGame();
  }
};

playGame();
