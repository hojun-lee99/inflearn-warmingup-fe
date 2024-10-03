const retryBtn = document.querySelector('.retry-btn');

// js는 전역변수를 공유
// const HIDDEN_CLASSNAME = 'hidden';

function restartGame() {
   const playContainer = document.querySelector('.play-container');
   playContainer.classList.remove(HIDDEN_CLASSNAME);

   const resultContainer = document.querySelector('.result-container');
   resultContainer.classList.add(HIDDEN_CLASSNAME);

   const playerScore = document.querySelector('#player-score');
   playerScore.innerHTML = 0;

   const computerScore = document.querySelector('#computer-score');
   computerScore.innerHTML = 0;

   const remainNumbers = document.querySelector('#remain-numbers');
   remainNumbers.innerHTML = 10;
}

retryBtn.addEventListener('click', restartGame);
