"use client"

import styles from "./ProductCard.module.css";
import {useCart} from "@/components/CartProvider/context";

interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
  totalPrice: number;
}


export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem, removeItem } = useCart();
  const { id, image_url, title, description, price } = product;

  const cartItem = items.find(item => item.id === id);
  const count = cartItem?.count || 0;
  const handleAdd = () => {
    addItem({ ...product, count: count + 1});
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <div className={styles.ProductCard}>
      <img className={styles.img} src={image_url} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>цена: {price} ₽</p>

      <div className={styles.actions}>
        {!count && <button onClick={handleAdd}>купить</button>}
        {count > 0 && (
          <>
            <button className={styles.buttonSymbol} onClick={handleAdd}>+</button>
            <div className={styles.count}>{count}</div>
            <button className={styles.buttonSymbol} onClick={handleRemove}>-</button>
          </>
        )}
      </div>
    </div>
  );
}
