const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const startBtn = document.getElementById('button-start');
const stopBtn = document.getElementById('button-stop');
const resetBtn = document.getElementById('button-reset');

let seconds = 0;
let tens = 0;
let interval;

startBtn.onclick = () => {
   interval = setInterval(startTimer, 10);
};

function startTimer() {
   tens++;

   if (tens > 99) {
      tens = 0;
      appendTens.innerText = tens;
      seconds++;
      appendSeconds.innerText = seconds;
   } else {
      appendTens.innerText = tens;
   }
}

stopBtn.onclick = () => {
   clearInterval(interval);
   interval = null;
};

resetBtn.onclick = () => {
   tens = 0;
   appendTens.innerText = tens;
   seconds = 0;
   appendSeconds.innerText = seconds;
};
