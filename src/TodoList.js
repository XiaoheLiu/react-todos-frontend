import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';
import * as apiCalls from './api';

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

    async loadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }

    async addTodo(newName) {
        let newTodo = await apiCalls.createTodo(newName);
        this.setState({
            todos: [
                ...this.state.todos, 
                newTodo
            ]
        });
    }

    async deleteTodo(id) {
        await apiCalls.deleteTodo(id);
        const todos = this.state.todos.filter(t => (
            t._id !== id
        ));
        this.setState({todos});
    }

    async toggleTodo(todo) {
        await apiCalls.updateTodo(todo);
        const todos = this.state.todos.map(t => (
            t._id !== todo._id ? t :
            {
                ...t,
                completed: ! t.completed
            }
        ));
        this.setState({todos});
    }

    render() {
        const {todos} = this.state;
        const todoItems = todos.map(todo => (
            <TodoItem
                key={todo._id}
                {...todo}
                onDelete={this.deleteTodo.bind(this, todo._id)}
                onToggle={this.toggleTodo.bind(this, todo)}
            />
        ));
        return (
            <div className="todoList">
                <header>
                    <h1><span>react</span>:Todo</h1>
                    <h2>A simple todo app built with React frontend and Node backend.</h2>
                </header>
                <TodoForm 
                    addTodo={this.addTodo}
                />
                <ul> {todoItems} </ul>
            </div>
        )
    }
}

export default TodoList;