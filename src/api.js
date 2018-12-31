const API_URL='/api/todos/';

export async function getTodos() {
    return fetch(API_URL)
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
}

export async function createTodo(newName) {
    return fetch(API_URL, {
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
}

export async function deleteTodo(id) {
    return fetch(`${API_URL}${id}`, {
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
}

export async function updateTodo(todo) {
    return fetch(`${API_URL}${todo._id}`, {
        method: "put",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            completed: ! todo.completed
        })
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
}