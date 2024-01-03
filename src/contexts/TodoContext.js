import { createContext, useContext, useReducer, useState } from "react";

const todos = [
  {
    id: 1,
    title: "Todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    completed: true,
  },
  {
    id: 3,
    title: "Todo 3",
    completed: false,
  },
];

const initialState = {
  todos: todos,
  completed: false,
};

// const generateRandomId = () => {
//   return Math.random().toString(36).substring(2);
// };

// const id = generateRandomId();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    default:
      return state;
  }
};

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [{ todos, completed }, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Handling form open
  function handleOpenForm() {
    setIsOpen((isOpen) => !isOpen);
  }

  //   Handling submit
  function handleSubmit(e) {
    if (!inputValue) return;
    e.preventDefault();

    // Create new todo
    const newTodo = {
      id: Math.random().toString(36).substring(2),
      title:
        inputValue.slice(0, 1).toUpperCase() +
        inputValue.slice(1).toLowerCase(),
      completed: false,
    };

    // Push to todos array
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    console.log(newTodo);

    setInputValue("");
  }

  function handleDelete(id) {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        completed,
        dispatch,
        handleOpenForm,
        handleSubmit,
        setInputValue,
        inputValue,
        isOpen,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useList() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("useTodoList must be used within a TodoProvider");
  return context;
}

export { useList, TodoProvider };
