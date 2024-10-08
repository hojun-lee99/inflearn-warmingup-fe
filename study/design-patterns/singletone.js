/*
 * 싱글톤 패턴
 * 클래스에서 하나의 인스턴스만 생성 가능하게 하함
 * 여러 곳에서 하나의 인스턴스를 공유하여 사용할 수 있게 함
 * ex)
 * 보륨 바가 싱글톤 패턴으로 작성 되었을 경우
 * 1번 사용자가 볼륨은 2에서 5로 조정했을 때,
 * 2번 사용자 또한 볼륨이 2에서 5로 조정되어야 함
 */

let instance;
// 싱글톤 클래스
class Singleton {
   constructor() {
      if (instance) {
         throw new Error('하나의 인스턴스만 생성 가능 합니다');
      }
      this.counter = 0;
      instance = this;
   }

   getCount() {
      return this.counter;
   }

   increaseCount() {
      return this.counter++;
   }

   decreaseCount() {
      return this.counter--;
   }
}

// 싱글톤 인스턴스 생성
const singletonInstance = new Singleton();
// const singletonInstance2 = new Singleton(); 에러 발생
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();
singletonInstance.increaseCount();

console.log(singletonInstance.getCount());

singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();
singletonInstance.decreaseCount();

console.log(singletonInstance.getCount());

// 모듈화 하여 다른 파일에서도 인스턴스를 사용할 수 있도록 함
export default Singleton;
