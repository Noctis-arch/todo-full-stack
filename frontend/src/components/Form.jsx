import { useRef } from "react";

export default function Form({ handleCreate }) {

    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        // package up our todo with the input value 
        const todo = {
            text: inputRef.current.value
        };
        // reset the input's value
        inputRef.current.value = "";
        // focus on the input
        inputRef.current.focus();
        handleCreate(todo);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button>Submit</button>
        </form>
    )
}