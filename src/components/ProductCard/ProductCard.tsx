import styles from "./ProductCard.module.css";

export default function ProductCard({
                                      title = "Название товара",
                                      description = "Описание",
                                      price = 0,
                                    }: {
  title?: string,
  description?: string,
  price?: number,
}) {
  return (
    <div className={styles.ProductCard}>
      <div>IMAGE</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>цена {price} ₽ </p>
    </div>
  );
}
