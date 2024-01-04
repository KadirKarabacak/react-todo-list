import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// const todos = [
//   {
//     id: 1,
//     title: "Practice Context API",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Practice State Management",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Learn TypeScript",
//     completed: false,
//   },
// ];

const initialState = {
  todos: [],
  completed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TAKE_TODO":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state?.todos, action.payload],
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

  // Get todos from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todos"));

    console.log("Stored Data:", storedData);
    dispatch({ type: "TAKE_TODO", payload: storedData });
  }, []);

  // Set items to Local storage
  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );

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

    setIsOpen(false);
    setInputValue("");
  }

  function handleDelete(id) {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }

  function handleToggle(id) {
    dispatch({
      type: "TOGGLE_TODO",
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
        handleToggle,
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
