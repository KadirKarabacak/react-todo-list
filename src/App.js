// import { useEffect, useRef } from "react";
import "./index.css";

import { TodoProvider } from "./contexts/TodoContext";

// Components
import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";
import { AddButton } from "./components/AddButton/AddButton";
import { CreateToDo } from "./components/CreateToDo/CreateToDo";

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

export default App;
