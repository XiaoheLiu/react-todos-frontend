import React, { Component } from 'react';
import TodoItem from './TodoItem.js';
import TodoForm from './TodoForm.js';
import './TodoList.css';
const API_URL='/api/todos/';

class TodoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            todos: []
        };

        this.addTodo = this.addTodo.bind(this);
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

    addTodo(newName) {
        fetch(API_URL, {
            method: "post",
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name: newName})
        })
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
        .then(newTodo => {
            this.setState({
                todos: [
                    ...this.state.todos, 
                    newTodo
                ]
            });
        }); 
    }

    deleteTodo(id) {
        fetch(`${API_URL}${id}`, {
            method: "delete",
        })
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
        .then(() => {
            const todos = this.state.todos.filter(t => (
                t._id !== id
            ));
            this.setState({todos});
        }); 
    }

    render() {
        const {todos} = this.state;
        const todoItems = todos.map(todo => (
            <TodoItem
                key={todo._id}
                {...todo}
                onDelete={this.deleteTodo.bind(this,todo._id)}
            />
        ));
        return (
            <div className="todoList">
                <h1> react:Todo App </h1>
                <TodoForm 
                    addTodo={this.addTodo}
                />
                <ul> {todoItems} </ul>
            </div>
        )
    }
}

export default TodoList;