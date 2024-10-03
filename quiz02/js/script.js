const btns = document.querySelectorAll('.button');

const HIDDEN_CLASSNAME = 'hidden';

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}

function clacWin(answer) {
   return answer - getRandomInt(3);
}

//결과 출력
function showResult() {
   const hiddenElement = document.querySelector('.play-container');
   hiddenElement.classList.add(HIDDEN_CLASSNAME);

   const showElement = document.querySelector('.result-container');
   showElement.classList.remove(HIDDEN_CLASSNAME);

   const playerScoreElem = document.querySelector('#player-score');
   const computerScoreElem = document.querySelector('#computer-score');
   const playerScore = playerScoreElem.innerHTML;
   const computerScore = computerScoreElem.innerHTML;
   const resultSpan = document.querySelector('.result');

   Number(playerScore - computerScore) > 0
      ? (resultSpan.innerHTML = '이겼습니다')
      : computerScore - playerScore
      ? (resultSpan.innerHTML = '졌습니다')
      : (resultSpan.innerHTML = '비겼습니다');
}

function clickBtn(e) {
   const value = Number(e.srcElement.id);
   const result = clacWin(value);
   const remainNumbers = document.querySelector('#remain-numbers');
   let remainNum = Number(remainNumbers.innerHTML);
   const playerScoreElem = document.querySelector('#player-score');
   const computerScoreElem = document.querySelector('#computer-score');
   const gameResult = document.querySelector('#game-result');

   if (result === 0) {
      gameResult.innerHTML = '비겼습니다';
   } else if (result === 1 || result === -2) {
      playerScoreElem.innerHTML = Number(playerScoreElem.innerHTML) + 1;
      gameResult.innerHTML = '이겼습니다';
   } else {
      computerScoreElem.innerHTML = Number(computerScoreElem.innerHTML) + 1;
      gameResult.innerHTML = '졌습니다';
   }
   //남은 횟수 차감
   remainNumbers.innerHTML = --remainNum;
   //남은 횟수가 없을 경우 결과 창 출력
   if (remainNum === 0) {
      showResult();
   }
}

for (elemnet of btns) {
   elemnet.addEventListener('click', clickBtn);
}
