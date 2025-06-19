import styles from "./Cart.module.css";
import React from "react";
import Form from "next/form";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
export default function Cart() {

  return (
    <div className={styles.Cart}>
      <h3>Добавленные товары</h3>
      <ul className={styles.list}>
        <li>
          <div className={styles.name}>Товар 1</div>
          <div className={styles.count}>х3</div>
          <div>3645 ₽</div>
        </li>
        <li>
          <div className={styles.name}>Товар 1</div>
          <div className={styles.count}>х3</div>
          <div>364546 ₽</div>
        </li>
      </ul>
      <Form  action="">
        <div className={styles.action}>
          <PhoneInput/>
        <button className={styles.button} type="submit">заказать</button></div>
      </Form>


    </div>
  );
}
