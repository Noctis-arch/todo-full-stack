const BASE_URL = import.meta.env.VITE_BASE_URL

export async function getTodos() {
    try {
        const response = await fetch(`${BASE_URL}/api/todos`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function createTodo(todo) {
    try {

        // send this data as a POST request
        const response = await fetch(`${BASE_URL}/api/todos`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const newTodo = await response.json();

        console.log(newTodo);

        return newTodo;

    } catch (e) {
        console.log(e);
    }
}

export async function deleteTodo(id) {

    try {

        // delete the todo we clicked on using its id
        const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        return data;

    } catch (e) {
        console.log(e);
    }

}

export async function updateTodo(todos, id) {

    // find the todo in our state 
    const todo = todos.find((todo) => todo._id == id);

    // update the value of the completed property 
    todo.completed = !todo.completed

    try {
        // send the updated todo in a PUT request
        const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        return data;

    } catch (e) {   
        console.log(e);
    }
}