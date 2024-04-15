// TodoListContainer.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import boxImage from "./images/box_14152962.png";

const TodoListContainer = () => {
  let [todoList, setTodoList] = useState([]);

  useEffect(() => {
    try {
      todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      setTodoList(todoList);
    } catch (error) {
      console.error('Error fetching todo list from local storage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);



  const handleAddTodo = (todoText) => {
    if (!todoText.trim()) {
      alert('Enter Valid Text');
      return;
    }
    const newTodo = {
      text: todoText,
      uniqueNo: Date.now(),
      isChecked: false,
    };
    setTodoList([...todoList, newTodo]);
    localStorage.setItem('todoList', JSON.stringify(todoList));

  };

  const handleTodoStatusChange = (uniqueNo) => {
    setTodoList(todoList.map(todo => {
      if (todo.uniqueNo === uniqueNo) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    }));
  };

  const handleDeleteTodo = (uniqueNo) => {

    let deleteElementIndex = todoList.findIndex(function (eachTodo) {
      let eachTodoId = eachTodo.uniqueNo;
      if (eachTodoId === uniqueNo) {
        return true;
      } else {
        return false;
      }
    });
    todoList.splice(deleteElementIndex, 1);
    setTodoList([...todoList]);
  };

  const handleSaveTodoList = () => {
    try {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } catch (error) {
      console.error('Error saving todo list to local storage:', error);
    }

    alert('Todo list saved successfully!');
  };

  return (
    <div className="mainContainer">
      <div className="todos-bg-container">
        <h1 className="todos-heading">To Do List</h1>
        <h1 className="create-task-heading">Create Task</h1>
        <input
          type="text"
          className="todo-user-input"
          placeholder="What needs to be done?"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          className="button"
          onClick={() => {
            const todoText = document.querySelector('.todo-user-input').value;
            handleAddTodo(todoText);
            document.querySelector('.todo-user-input').value = '';
          }}
        >
          Add
        </button>
        {todoList.length > 0 && (
          <>
            <h1 className="create-task-heading">
              My Tasks ({todoList.filter(todo => !todo.isChecked).length} tasks pending)
            </h1>
            {todoList.map(todo => (
              !todo.isChecked && (
                <TodoItem
                  key={todo.uniqueNo}
                  todo={todo}
                  onStatusChange={handleTodoStatusChange}
                  onDeleteTodo={handleDeleteTodo}
                />
              )
            ))}
            {todoList.map(todo => (
              todo.isChecked && (
                <TodoItem
                  key={todo.uniqueNo}
                  todo={todo}
                  onStatusChange={handleTodoStatusChange}
                  onDeleteTodo={handleDeleteTodo}
                />
              )
            ))}
            <button className="button" onClick={handleSaveTodoList}>Save</button>
          </>
        )}


        {todoList.length === 0 && (
          <div className="placeholder-container">
            <img src={boxImage} className="boxImage" alt="No todos available" />
          </div>
        )}

      </div>
    </div>
  );
};

export default TodoListContainer;
