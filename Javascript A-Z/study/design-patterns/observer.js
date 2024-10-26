/*
 * obeserver 패턴
 * event driven 시스템을 이용하는 것
 * 특정 Subject에 관심이 있는 Observer들이 Subject를 등록하면 알람이 오고
 * Subject 알람을 더 이상 받기 싫을 때 취소하는 방식
 * ex) 트위터 등의 SNS에서 구독과 구독 취소
 */
const pinkBtn = document.getElementById('pink-btn');
const blueBtn = document.getElementById('blue-btn');

// observer1
function sendToGoogleAnalytics(data) {
   console.log('Sent to Google Analytics: ', data);
}

// observer2
function sendToCustomAnalytics(data) {
   console.log('Sent to Custom Analytics: ', data);
}

// observer3
function sendToEmail(data) {
   console.log('Sent to email: ', data);
}
성;
const observers = [];
// Object 프로토 타입에 freeze 메소드를 사용하여 불변으로 notify, subscribe, unsubscribe 추가하여 Observer 객체를 생성
const Observer = Object.freeze({
   // observers 배열에 각각의 func(data) 실행
   notify: (data) => observers.forEach((observer) => observer(data)),
   // observers 배열에 func 추가
   subscribe: (func) => observers.push(func),
   unsubscribe: (func) => {
      [...observers].forEach((observer, index) => {
         if (observer === func) {
            // splice(index, 제거할 갯수) => observers에 있는 함수와 동일한 함수를 제거
            observers.splice(index, 1);
         }
      });
   },
});

// observer들이 subject에 추가
Observer.subscribe(sendToGoogleAnalytics);
Observer.subscribe(sendToCustomAnalytics);
Observer.subscribe(sendToEmail);

pinkBtn.addEventListener('click', () => {
   const data = '🎀 Click on pink button! 🎀';
   Observer.notify(data);
});

blueBtn.addEventListener('click', () => {
   const data = '🦋 Click on pink button! 🦋';
   Observer.notify(data);
});
