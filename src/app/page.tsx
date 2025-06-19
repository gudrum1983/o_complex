import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import Cart from "@/components/Cart/Cart";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>

        <ReviewsList/>
<Cart/>
        <ProductCard/>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
