import React, { Component } from 'react';
import TodoItem from './TodoItem.js';
import './TodoList.css';
const API_URL='/api/todos';

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentWillMount() {
        this.loadTodos();
    }

    loadTodos() {
        fetch(API_URL)
        .then(resp => {
            if(!resp.ok) {
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessge: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: "Please try again later. There is something wrong with the server..."}
                    throw err;
                }
            }
            return resp.json();
        })
        .then(todos => this.setState({todos}));
    }

    render() {
        const {todos} = this.state;
        const todoItems = todos.map(todo => (
            <TodoItem
                key={todo._id}
                name={todo.name}
                completed={todo.completed}
            />
        ));
        return (
            <div className="todoList">
                <h1> react:Todo App </h1>
                <ul> {todoItems} </ul>
            </div>
        )
    }
}

export default TodoList;