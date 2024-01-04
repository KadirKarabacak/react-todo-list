import { useList } from "../../contexts/TodoContext";
import styles from "./CreateToDo.module.css";

export function CreateToDo() {
  const { isOpen, handleSubmit, inputValue, setInputValue } = useList();
  return (
    <>
      <form
        className={`${styles.create_screen} ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <input
          required
          placeholder="Add some todo"
          className={styles.create_info}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit} className={styles.create_button}>
          Add To List
        </button>
      </form>
    </>
  );
}
