import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List.js';

const Lists = React.memo(({ todoData, setTodoData }) => {
  const handleEnd = (result) => {
    // result 이벤트
    console.log(result);

    // 목적지가 없으면(이벤트 취소) return
    if (!result.destination) return;

    // 불변성을 위한 todoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 제거
    // 2. 제거된 아이템 splice 반환 값을 저장
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // destination index 위치에 reordeeredItem 삽입
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="to-dos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
