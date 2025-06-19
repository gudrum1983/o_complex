import styles from "./Header.module.css";

export default function Header({title = "тестовое задание"}: { title?: string }) {
  return (
    <header className={styles.Header}>
        <h1>{title}</h1>
    </header>
  );
}
