import { useRef } from "react";
import { useState, useEffect } from "react";

export default function App() {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  async function getData() {
    // get all todo items
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json();
    console.log(data);
    setTodos(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // package up our todo with the input value 
    const todo = {
      text: inputRef.current.value
    };

    console.log(todo);

    // send this data as a POST request
    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const newTodo = await response.json();

    console.log(newTodo);

    // reset the input's value
    inputRef.current.value = "";

    // focus on the input
    inputRef.current.focus();

    // retrieve our latest data from our database
    getData();

    // ALTERNATIVE: updating the state with our new todo 
    // setTodos([...todos, newTodo]);

  }

  async function handleDelete(id) {
    console.log(id);
    // delete the todo we clicked on using its id
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    });

    // retrieve our latest data from our database
    getData();

  }

  async function handleUpdate(id) {

    // find the todo in our state 
    const todo = todos.find((todo) => todo._id == id);

    // update the value of the completed property 
    todo.completed = !todo.completed
    
    // send the updated todo in a PUT request
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(response);

    // retrieve our latest data from our database
    getData();
    
  }

  return (
    <div>

      <h1>Todos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Submit</button>
      </form>

      <ul>
        {todos.map((todo) => 
          <li key={todo._id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleUpdate(todo._id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        )}
      </ul>

    </div>
  )
}