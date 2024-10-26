const bookInfoForm = document.getElementById('book-info-form');
const bookName = document.querySelector('#book-name');
const bookAuth = document.querySelector('#book-auth');
const bookList = document.getElementById('book-list');

const BOOKLIST_KEY = 'books';

let books = [];

const savedBooks = localStorage.getItem(BOOKLIST_KEY);
// localStorage에 데이터가 있으면 화면에 업데이트
if (savedBooks !== null) {
   const parsedBooks = JSON.parse(savedBooks);
   books = parsedBooks;
   parsedBooks.forEach(paintBookInfo);
}

// localStorage에 추가한 책 정보 저장
function saveBooks() {
   localStorage.setItem(BOOKLIST_KEY, JSON.stringify(books));
}

// 추가된 책 정보 삭제 후 localStorage 업데이트
function deleteBookInfo(event) {
   const targetLi = event.target.parentElement;
   books = books.filter((book) => book.id !== parseInt(targetLi.id));
   targetLi.remove();
   saveBooks();
}

// html에 책정보 추가
function paintBookInfo(newBookInfo) {
   const li = document.createElement('li');
   li.id = newBookInfo.id;
   li.classList.add('book-info');

   const divName = document.createElement('divName');
   divName.innerText = newBookInfo.name;
   divName.classList.add('name');

   const divAuth = document.createElement('divAuth');
   divAuth.innerText = newBookInfo.auth;
   divAuth.classList.add('auth');

   const button = document.createElement('button');
   button.innerText = '❌';
   button.addEventListener('click', deleteBookInfo);

   li.appendChild(divName);
   li.appendChild(divAuth);
   li.appendChild(button);
   bookList.appendChild(li);
}

function handleSubmit(event) {
   // submit 되었을때 페이지 refresh 방지
   event.preventDefault();
   const newBookName = bookName.value;
   bookName.value = '';
   const newBookAuth = bookAuth.value;
   bookAuth.value = '';

   const newBookInfoObj = {
      id: Date.now(),
      name: newBookName,
      auth: newBookAuth,
   };

   console.log(newBookInfoObj);
   books.push(newBookInfoObj);

   paintBookInfo(newBookInfoObj);
   saveBooks();
}

bookInfoForm.addEventListener('submit', handleSubmit);
