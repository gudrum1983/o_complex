"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {Product, ProductRequest} from "@/types";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./ProductList.module.css";

export default function ProductListClient({
                                            initialItems,
                                            initialTotal,
                                          }: {
  initialItems: Product[];
  initialTotal: number;
}) {
  const [products, setProducts] = useState(initialItems);
  const [total] = useState(initialTotal);
  const [page, setPage] = useState(2);

  // --- Защита ---
  const loadingRef = useRef(false);
  const loadedPages = useRef<Set<number>>(new Set([1]));

  const loadMore = useCallback(async () => {
    if (loadingRef.current || products.length >= total || loadedPages.current.has(page)) return;

    loadingRef.current = true;

    try {
      const res = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=6`);
      const data: ProductRequest = await res.json();

      setProducts(prev => {
        const existingIds = new Set(prev.map(product => product.id));
        const newItems = data.items.filter(product => !existingIds.has(product.id));
        return [...prev, ...newItems];
      });

      loadedPages.current.add(page);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
    } finally {
      loadingRef.current = false;
    }
  }, [page, products.length, total]);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom) loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [products.length, total, loadMore]);

  return (
    <>
      <ul className={styles.ProductList}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {products.length < total && <p>Загрузка...</p>}
      {products.length >= total && <p>Все товары загружены.</p>}
    </>
  );
}
