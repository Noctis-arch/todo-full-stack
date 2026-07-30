import { useRef } from "react";
import { useState, useEffect } from "react";

export default function App() {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  async function getData() {
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
            <input type="checkbox" checked={todo.completed} />
            {todo.text}
          </li>
        )}
      </ul>

    </div>
  )
}