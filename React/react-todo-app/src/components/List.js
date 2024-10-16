import React, { useState } from 'react';

const List = React.memo(
  ({ id, title, completed, todoData, setTodoData, provided, snapshot }) => {
    const [isEditting, setIsEditting] = useState(false);
    const [edittedTitle, setEdittedTitle] = useState(title);

    const handleClick = (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    };

    const handleCompleteChange = (id) => {
      // id가 같은 데이터를 찾아 completed 값으 반대로 변경
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };

    const handleEditChange = (e) => {
      setEdittedTitle(e.target.value);
    };

    const handleSubmit = () => {
      // id 값이 같은 data의 title 변경
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = edittedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      setIsEditting(false);
    };

    if (isEditting) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 mr-4 text-gray-500"
              value={edittedTitle}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
          <div className="items-center">
            <button
              className="float-right px-4 py-2"
              onClick={() => setIsEditting(false)}
              type="button"
            >
              x
            </button>
            <button
              onClick={handleSubmit}
              className="float-right px-4 py-2"
              type="submit"
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
          } flex items-center justify-between w-full px-4
py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              onChange={() => handleCompleteChange(id)}
              defaultChecked={completed}
            />{' '}
            <span
              // completed && line-through에서 warning log 발생으로 변경
              // completed가 false 일 때, className이 false로 반환되기 때문에 발생하는 것으로 생각 된다
              className={completed ? 'line-through' : undefined}
            >{` ${title}`}</span>
          </div>
          <div className="items-center">
            <button
              className="float-right px-4 py-2"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="float-right px-4 py-2"
              onClick={() => setIsEditting(true)}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  },
);

export default List;
