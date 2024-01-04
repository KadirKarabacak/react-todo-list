import { useList } from "../../contexts/TodoContext";
import { ListItem } from "../ListItem/ListItem";
import styles from "./List.module.css";
export function List() {
  const { todos } = useList();
  return (
    <ul className={styles.list}>
      {todos?.map((todo) => (
        <ListItem todo={todo} key={todo.id} id={todo.id}>
          {todo.title}
        </ListItem>
      ))}
    </ul>
  );
}
