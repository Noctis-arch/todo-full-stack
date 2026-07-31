import { useRef } from "react";
import { useState, useEffect } from "react";

import { createTodo, deleteTodo, getTodos, updateTodo } from "./api";

import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

export default function App() {

  const [todos, setTodos] = useState([]);

  async function getData() {
    // get all todo items
    const data = await getTodos();
    setTodos(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleCreate(todo) {

    await createTodo(todo);

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

      <Header />

      <Form handleCreate={handleCreate} />

      <TodoList  
        todos={todos}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />

    </div>
  )
}