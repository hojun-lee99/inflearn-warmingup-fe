const addBtn = document.getElementById('button#add-btn');


function clickAddBtn(e) {
   console.log(e.target);

   const bookTitle = document.querySelector('#book-title').innerText;
   const bookAuthor = document.querySelector('#book-author').innerText;
   const bookListCtn = document.querySelector('.book-list-container');

   let bookInfoElement = document.createElement('div');
   bookInfoElement.innerHTML = 'test';
   bookListCtn.append(bookInfoElement);
}

addBtn.addEventListener('click', clickAddBtn);
