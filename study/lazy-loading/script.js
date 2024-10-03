// IntersectionObserver 인스턴스
const observer = new IntersectionObserver(
   function (entries, observer) {
      entries.forEach((entry) => {
         // 루트요소와 타켓요소가 교차하면 data-src에 있는 url을 src에 넣어준다
         if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;

            // Lazy Loading을 완료한 후에는 unobserve
            observer.unobserve(entry.target);
         }
      });
   },
   { threshold: 1 },
);
// 타겟(img 태그)이 루트(view point)에 100% 겹칠 경우 콜백을 실행

const imgs = document.querySelectorAll('img');
imgs.forEach((img) => {
   observer.observe(img);
});
