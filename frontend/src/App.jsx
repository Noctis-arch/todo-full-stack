import { useState, useEffect } from "react";

export default function App() {

  const [todos, setTodos] = useState([]);

  async function getData() {
    const response = await fetch('http://localhost:3000/api/todos');
    const data = await response.json();
    console.log(data);
    setTodos(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
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