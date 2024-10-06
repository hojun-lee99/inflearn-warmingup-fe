'use strict';

const quiz = {
   '2 + 2?': 4,
   '4 + 2?': 6,
   '10 + 11?': 21,
};

let quizIndex = 0;
const key = [];
const value = [];

for (let property in quiz) {
   key.push(property);
   value.push(quiz[property]);
}

function loadWindow() {
   const question = document.querySelector('.question');
   question.textContent = key[quizIndex];
}

window.addEventListener('load', loadWindow);

// 필요하면 사용할 것들
// const quizSize = quiz.legth;

// const main = document.querySelector('main');

// let item = document.createElement('p');
// item.textContent = 'test';
// main.appendChild(item);

// for (let prop in quiz) {
//    console.log(prop, quiz[prop]);
// }
