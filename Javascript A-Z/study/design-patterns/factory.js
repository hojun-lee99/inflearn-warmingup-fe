/*
 * 팩토리 패턴
 * 동일한 속성의 객체들을 만들어야 할 때, 팩토리 함수를 만들어 객체를 생성
 */

const createBook = (title, author, price) => ({
   title,
   author,
   price,
});

const book1 = createBook('book1', 'author1', 1000);
const book2 = createBook('book2', 'author2', 2000);
const book3 = createBook('book3', 'author3', 3000);

console.log(book1, book2, book3);
