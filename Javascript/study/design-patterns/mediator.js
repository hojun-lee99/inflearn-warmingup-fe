/*
 * mediator (중재자) 패턴
 * 객체 그룹을 관리하는 중재자를 만들어 중앙 권한을 제공하는 패턴
 */

class Participant {
   constructor(name) {
      this.name = name;
      this.chatRoom = null;
      this.message = [];
   }

   // * 참가자가 메시지 보낼 경우 ChatRoom(중재자)로 메시지를 보냄
   send(message, to) {
      this.chatRoom.send(message, this, to);
   }

   recieve(message, from) {
      this.message.push({ message, from });
   }

   showMessage() {
      console.log(this.message);
   }
}

class ChatRoom {
   constructor() {
      this.participants = {};
   }

   // * 채팅방 입장시 participant.chatRoom을 ChatRoom의 객체를 전달
   enter(participant) {
      this.participants[participant.name] = participant;
      participant.chatRoom = this;
   }

   // * participant.send()를 통해 받은 매시지를 컨트롤 하여 to에게 전달
   send(message, participant, to) {
      // 존재 여부 확인
      if (this.participants[to.name]) {
         this.participants[to.name].recieve(message, participant);
      } else {
         console.error(`Participant ${to.name} not found!`); // 에러 메시지 추가
      }
   }
}

const chatRoom1 = new ChatRoom();

const user1 = new Participant('user1');
const user2 = new Participant('user2');
const user3 = new Participant('user3');

chatRoom1.enter(user1);
chatRoom1.enter(user2);
chatRoom1.enter(user3);

user2.send('hi user1', user1);
user2.send('bye user1', user1);

console.log(chatRoom1);
console.log(user1);
