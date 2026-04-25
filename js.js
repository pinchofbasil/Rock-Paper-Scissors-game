let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();

const btnRock = document.querySelector('.btn-rock').addEventListener('click', () => {
    playgame('rock')
});
const btnPaper = document.querySelector('.btn-paper').addEventListener('click', () => {
    playgame('paper')
});
const btnScissors = document.querySelector('.btn-scissors').addEventListener('click', () => {
    playgame('scissors')
});
const btnReset = document.querySelector('.btn-reset').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
});

function updateScore() {
    document.querySelector('.js-score').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = (randomNumber >= 0 && randomNumber < 1 / 3) ? 'rock' :
        (randomNumber >= 1 / 3 && randomNumber < 2 / 3) ? 'paper' : 'scissors';
    return computerMove;
}

function playgame(playerMove) {
    const computerMove = pickComputerMove();
    let result = (playerMove === computerMove) ? 'Tie' :
        (playerMove === 'rock' && computerMove === 'scissors') ||
            (playerMove === 'paper' && computerMove === 'rock') ||
            (playerMove === 'scissors' && computerMove === 'paper') ? 'You Win!' : 'You Lose!';

    const scoreKey = (result === 'You Win!') ? 'wins' : (result === 'You Lose!') ? 'losses' : 'ties';
    score[scoreKey]++;

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();

    document.querySelector('.js-result').innerText = result;
}
