const btn = document.querySelectorAll('.nav-btn');

const HIDDEN_CLASSNAME = 'hidden';

function clickBtn(event) {
   const value = event.srcElement.value;
   const articleContainers = document.querySelectorAll('.container');

   if (value === 'All') {
      for (element of articleContainers) {
         element.classList.remove(HIDDEN_CLASSNAME);
      }
   } else {
      for (element of articleContainers) {
         console.log('vlaue 출력');

         if (!element.classList.contains(value)) {
            element.classList.add(HIDDEN_CLASSNAME);
         } else {
            element.classList.remove(HIDDEN_CLASSNAME);
         }
      }
      console.log(articleContainers);
   }
}

// 각각의 버튼에 이벤트 추가
for (element of btn) {
   element.addEventListener('click', clickBtn);
}
