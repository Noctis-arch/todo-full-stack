import { useRef } from "react";
import { useState, useEffect } from "react";

import { createTodo, deleteTodo, getTodos, updateTodo } from "./api";

export default function App() {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  async function getData() {
    // get all todo items
    const data = await getTodos();
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

    await createTodo(todo);

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

      await deleteTodo(id)

      // retrieve our latest data from our database
      getData();
  }

  async function handleUpdate(id) {

      await updateTodo(todos, id);

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