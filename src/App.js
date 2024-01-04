import { useList } from "./contexts/TodoContext";
import "./index.css";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <div className="container">
          <Header />
          <List />
          <AddButton />
        </div>
        <CreateToDo />
      </div>
    </TodoProvider>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="header_title">Todo List</h1>
    </header>
  );
}

function List() {
  const { todos } = useList();
  return (
    <ul className="list">
      {todos?.map((todo) => (
        <ListItem key={todo.id} id={todo.id}>
          {todo.title}
        </ListItem>
      ))}
    </ul>
  );
}

function ListItem({ children, id }) {
  const { handleDelete } = useList();
  return (
    <div className="list_item_container">
      <button onClick={() => handleDelete(id)} className="delete">
        x
      </button>
      <li className="list_item">{children}</li>
      <label className="checkbox_container">
        <input className="checkbox" type="checkbox" />
        <div className="checkmark"></div>
      </label>
    </div>
  );
}

// onClick open createToDo
function AddButton() {
  const { handleOpenForm, isOpen } = useList();
  return (
    <button onClick={handleOpenForm} className="add">
      {isOpen ? "-" : "+"}
    </button>
  );
}

function CreateToDo() {
  const { isOpen, handleSubmit, inputValue, setInputValue } = useList();
  return (
    <>
      <form className={`create_screen ${isOpen ? "visible" : "invisible"}`}>
        <input
          required
          placeholder="Add some todo"
          className="create_info"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit} className="create_button">
          Add To List
        </button>
      </form>
    </>
  );
}

export default App;
