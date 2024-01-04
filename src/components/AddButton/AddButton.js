import { useList } from "../../contexts/TodoContext";
import styles from "./AddButton.module.css";

export function AddButton() {
  const { handleOpenForm, isOpen } = useList();
  return (
    <button onClick={handleOpenForm} className={styles.add}>
      {isOpen ? "-" : "+"}
    </button>
  );
}
