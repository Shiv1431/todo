// TodoItem.js
import React from 'react';
import binImage from "./images/bin_6033424.png";

const TodoItem = ({ todo, onStatusChange, onDeleteTodo }) => {
  const { text, uniqueNo, isChecked } = todo;

  const handleCheckboxChange = () => {
    onStatusChange(uniqueNo);
  };

  return (
    <li className={`todo-item-container d-flex flex-row ${isChecked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="label-container d-flex flex-row">
        <label className="checkbox-label" htmlFor={`checkbox${uniqueNo}`}>
          {text}
        </label>
        <div className="delete-icon-container">
          <img src={binImage} className="binImage" alt="delete" onClick={() => onDeleteTodo(todo.id)} />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
