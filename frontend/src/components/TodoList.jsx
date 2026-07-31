import Todo from "./Todo";

export default function TodoList({ todos, handleDelete, handleUpdate }) {
    return (
        <ul>
            {todos.map((todo) => 
                <Todo  
                    key={todo._id}
                    todo={todo}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            )}
        </ul>
    )
}