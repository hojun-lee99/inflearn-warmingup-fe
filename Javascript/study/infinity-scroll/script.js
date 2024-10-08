// 한번에 추가될 아이템 갯수
const count = 50;
// 아이템의 인덱스
let itemIndex = 0;

let observer = new IntersectionObserver(
   (entris) => {
      entris.forEach((entry) => {
         const list = document.querySelector('.list');

         // 타겟 요소(end), 루트 요소(viewport)가 교차되면 Intersecting = true
         if (entry.isIntersecting) {
            for (let i = itemIndex; i < itemIndex + count; i++) {
               // item을 count만큼 생성 후 list에 추가
               let item = document.createElement('p');

               item.textContent = i;
               item.className = 'item';
               list.appendChild(item);
            }

            // itemIndex를 +count해 갱신
            itemIndex = itemIndex + count;
         }
      });
   },
   { root: null, threshold: 0.1 },
);
// root 옵션값이 null이거나 할당 되지 경우 루트 요소는 viewport가 default
// threshold: 0.1은 타겟 요소가 루트 요소에 10%가 겹치게 되면 콜백 함수를 실행

// 타겟 요소(p태그 .end)를 관찰
observer.observe(document.querySelector('.end'));
