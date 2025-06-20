import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import Cart from "@/components/Cart/Cart";
import ProductList from "@/components/ProductList/ProductList";
import {Product} from "@/types";
import {CartProvider} from "@/components/CartProvider/CartProvider";

async function getProducts(): Promise<{ items: Product[], total: number }> {
  const res = await fetch('http://o-complex.com:1337/products?page=1&page_size=6', {
    cache: 'no-store' // отключаем кэш, имитируя SSR
  });
  const data = await res.json();
  return {
    items: data.items,
    total: data.total,
  };
}

export default async function Home() {
  const {items, total} = await getProducts();

  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>

        <ReviewsList/>
        <CartProvider>
          <Cart/>
          <ProductList initialItems={items} initialTotal={total}/>
          <div id="popup-root" />
        </CartProvider>

      </main>

    </div>
  );
}