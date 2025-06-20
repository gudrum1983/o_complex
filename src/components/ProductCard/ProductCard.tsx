import styles from "./ProductCard.module.css";


interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}


export default function ProductCard({ product }: { product: Product }) {
  const {image_url, title, description, price} = product;

  return (
    <div className={styles.ProductCard}>
      <img className={styles.img} src={image_url} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>цена {price} ₽ </p>
    </div>
  );
}
