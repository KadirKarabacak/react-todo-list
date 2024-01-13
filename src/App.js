// import { useEffect, useRef } from "react";
import "./index.css";

import { TodoProvider } from "./contexts/TodoContext";

// Components
import { Header } from "./components/Header/Header";
import { List } from "./components/List/List";
import { AddButton } from "./components/AddButton/AddButton";
import { CreateToDo } from "./components/CreateToDo/CreateToDo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TodoProvider>
      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f3e4be",
            color: "#101010",
          },
        }}
      />
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
