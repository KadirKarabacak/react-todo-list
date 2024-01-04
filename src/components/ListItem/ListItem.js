import { useEffect, useRef } from "react";
import { useList } from "../../contexts/TodoContext";

import styles from "./ListItem.module.css";

export function ListItem({ children, id, todo }) {
  const { handleDelete, handleToggle } = useList();
  const checkbox = useRef(null);

  useEffect(() => {
    checkbox.current.checked = todo.completed;
  }, [todo.completed]);

  return (
    <div
      className={`${styles.list_item_container} ${
        todo.completed ? "complated" : ""
      }`}
    >
      <button onClick={() => handleDelete(id)} className={styles.delete}>
        x
      </button>
      <li
        className={`${styles.list_item} ${todo.completed ? "complated" : ""}`}
      >
        {children}
      </li>
      <label className={styles.checkbox_container}>
        <input
          onClick={() => handleToggle(id)}
          ref={checkbox}
          className={styles.checkbox}
          type="checkbox"
        />
        <div className={styles.checkmark}></div>
      </label>
    </div>
  );
}
