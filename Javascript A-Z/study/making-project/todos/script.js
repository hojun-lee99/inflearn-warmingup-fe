const list = document.getElementById('list');
const createBtn = document.getElementById('create-button');

let todos = [];

// * todo 아이템 추가 이벤트
createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
  // 아이템 객체
  const item = {
    id: new Date().getTime(), // 아이템 아이디로 현재 시간
    text: '',
    complete: false,
  };

  // 배열에 맨앞에 item 추가
  todos.unshift(item);

  // 요소 생성
  const { itemEl, inputEl } = createTodoElement(item);

  // 리스트 젤 앞에 생성한 요소 추가
  list.prepend(itemEl);

  // * 처음 todo를 추가면 작성 가능하게하고 커서를 focus해준다
  // disabled 속성 제거
  inputEl.removeAttribute('disabled');
  // input 요소에 focus
  inputEl.focus();

  saveToLocalStorage();
}

// * todo 아이템 엘리먼트 생성
function createTodoElement(item) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = item.complete;

  // complete 이면 스타일 적용을 위한 complete 클래스 추가
  if (item.complete) {
    itemEl.classList.add('complete');
  }

  // 할 일을 적는 input element
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = item.text;
  inputEl.setAttribute('disabled', ''); // 수정 버튼 클릭 전 사용 금지를 위한 disabled 속성

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('actions');

  const editBtnEl = document.createElement('button');
  editBtnEl.classList.add('material-icons');
  editBtnEl.innerText = 'edit';

  const removeBtnEl = document.createElement('button');
  removeBtnEl.classList.add('material-icons', 'remove-btn');
  removeBtnEl.innerText = 'remove_circle';

  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkBox);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  // * 각 요소들 이벤트
  checkBox.addEventListener('change', () => {
    item.complete = checkBox.checked;

    if (item.complete) {
      itemEl.classList.add('complete');
    } else {
      itemEl.classList.remove('complete');
    }
    saveToLocalStorage();
  });

  inputEl.addEventListener('input', () => {
    item.text = inputEl.value;
  });

  inputEl.addEventListener('blur', () => {
    inputEl.setAttribute('disabled', '');
    saveToLocalStorage();
  });

  editBtnEl.addEventListener('click', () => {
    inputEl.removeAttribute('disabled');
    inputEl.focus();
  });

  removeBtnEl.addEventListener('click', () => {
    todos = todos.filter((t) => t.id != item.id);

    itemEl.remove();

    saveToLocalStorage();
  });

  return { itemEl, inputEl, editBtnEl, removeBtnEl };
}

// * 로컬 스토리지에 todo 리스트 저장
function saveToLocalStorage() {
  // 저장을 위해 todos 배열 직렬화
  const data = JSON.stringify(todos);

  localStorage.setItem('my_todos', data);
}

// * 새로고침시 localStorage에 데이터를 가져와 리스트 출력
function loadFromLocalStorage() {
  const data = localStorage.getItem('my_todos');

  // 직렬화된 데이터를 json 형식으로 파싱
  if (data) {
    todos = JSON.parse(data);
  }
}

function displayTodos() {
  loadFromLocalStorage();

  todos.forEach((item) => {
    const { itemEl } = createTodoElement(item);

    list.append(itemEl);
  });
}

displayTodos();
