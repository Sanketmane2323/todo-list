import { useEffect, useState } from "react";
// import {FaPlus,FaTrash,FaPencilAlt} from 'react-icons'
import "./App.css";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
      );
    });
    return () => unsubscribe();
  }, []);

  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodos = async () => {
    console.log("button pressed");
    try {
      if (input.trim() !== "") {
        // setTodos([...todos, { id: new Date(), todo: input }]);
        await addDoc(collection(db, "todos"), { todo: input });
        setInput("");
      } else {
        alert("Todo item content cant be empty");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodos = async () => {
    try {
      if (input.trim() !== "") {
        // const updateTodos = [...todos];
        // updateTodos[editIndex].todo = input;
        // setTodos(updateTodos);
        const todoDocRef = doc(db, "todos", todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });
        setInput("");
        setEditIndex(-1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTodo = async (id) => {
    // const filterTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(filterTodos);

    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-6 bg-custom-bg bg-center bg-cover">
      <div className="bg-gray-100 p-6  shadow-sm rounded w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl text-center font-bold mb-4">ToDo List</h1>
        <div className="flex ">
          <input
            placeholder="Add a todo"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-4 py-2 px-4 border rounded w-full focus:outline-none"
          />
          <button
            onClick={editIndex === -1 ? addTodos : updateTodos}
            className="text-white bg-lime-500 hover:bg-lime-600 py-2 px-4 rounded "
          >
            {editIndex === -1 ? "Add" : "Edit"}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <div className="p-6 bg-gray-100 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded shadow-md mb-2"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    onClick={() => setEdit(index)}
                    className="text-white bg-amber-500 hover:bg-amber-600 py-1 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-white bg-red-500 hover:bg-red-600 py-1 px-4 rounded "
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
