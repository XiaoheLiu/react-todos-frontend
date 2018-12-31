import React from 'react';
import "./TodoItem.css";

const TodoItem = ({name, completed, onDelete, onToggle}) => (
    <li className="task">
        <span         
            style={{textDecoration: completed ? 
            "line-through" : "none"}}
            onClick={onToggle}
        >
            {name}
        </span>
        <span onClick={onDelete} id="delete"> x </span>
    </li>
)

export default TodoItem;