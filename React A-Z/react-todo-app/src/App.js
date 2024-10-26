import React, { useState } from 'react';
import Form from './components/Form';
import Lists from './components/Lists';

const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    // 페이지 리로드 방지
    e.preventDefault();

    // 새로운 todo 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 todoData에 newTodo 추가
    // input의 value 비우기
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };

  const handleRemoveClick = () => {
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  //* render
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
