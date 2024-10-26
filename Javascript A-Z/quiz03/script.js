'use strict';

const answerBtn = document.querySelectorAll('.answer');
const nextBtn = document.querySelectorAll('.btn');
const main = document.querySelector('main');

let index = 0;
const correct = ['4', '정답이 없습니다', '246'];

function clickAnswerBtn(e) {
   const answer = e.target.innerText;
   const nextBtn = e.target.parentElement.lastElementChild;
   const answerBtns = document.querySelectorAll(`#question-${index}>.answer`);
   // * 클릭한 버튼을 제외한 버튼 요소
   const filteredAnswerBtns = Array.from(answerBtns).filter(
      (item) => item !== e.target,
   );

   if (correct[index] === answer) {
      e.target.style.background = 'green';
      main.style.background = 'green';
      filteredAnswerBtns.forEach(
         (element) => (element.style.background = 'red'),
      );
   } else {
      e.target.style.background = 'red';
      main.style.background = 'red';
      filteredAnswerBtns.forEach(
         (element) => (element.style.background = 'green'),
      );
   }

   nextBtn.classList.remove('hidden');
}

function clickNextBtn(e) {
   if (index >= 2) {
      index = 0;
   } else {
      index++;
   }
   const nextQuestion = document.querySelector(`#question-${index}`);
   const buttons = document.querySelectorAll(`#question-${index}>.answer`);
   const currentQuestion = e.target.parentElement;

   currentQuestion.classList.add('hidden');
   nextQuestion.classList.remove('hidden');
   e.target.classList.add('hidden');
   main.style.background = 'gray';
   buttons.forEach((element) => {
      element.style.background = 'gray';
   });
}

// * 버튼 클릭 이벤트 추가
answerBtn.forEach((item) => {
   item.addEventListener('click', clickAnswerBtn);
});

nextBtn.forEach((item) => {
   item.addEventListener('click', clickNextBtn);
});
