import React, { Component } from 'react';
import './TodoForm.css';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTodo(this.state.inputValue);
        this.setState({inputValue:''});
    }

    render() {
        return (
            <form className="todoForm">
                <input 
                    type="text" 
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    id="todoInput" 
                    placeholder="What's your focus today?"
                />
                <button onClick={this.handleSubmit}>
                    + Todo
                </button>
            </form>
        );
    }
}

export default TodoForm;