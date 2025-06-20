"use client"

import styles from "./Cart.module.css";
import React, {useState} from "react";
import PhoneInput from "@/components/PhoneInput/PhoneInput";
import {useCart} from "@/components/CartProvider/context";
import Popup from "@/components/Popup/Popup";

export default function Cart() {
  const { items, phone, setPhone, clearCart } = useCart();
  const [errorPhone, setErrorPhone] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length < 10) {
      setErrorPhone(true);
      return;
    }

    if (!phone || items.length === 0) {
      setMessage("Заполните телефон и добавьте товары.");
      return;
    }

    const cartPayload = items.map(item => ({
      id: item.id,
      quantity: item.count,
    }));

    try {
      const res = await fetch("http://o-complex.com:1337/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: 7 + phone,
          cart: cartPayload,
        }),
      });

      const data = await res.json();

      if (data.success === 1) {
        setMessage("Заказ успешно отправлен!");
        // Можно очистить корзину и телефон при необходимости
        clearCart()
      } else {
        setMessage(data.error || "Произошла ошибка при отправке заказа.");
      }
    } catch (err) {
      setMessage(`Ошибка сети или сервера. ${err}`);
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (errorPhone) setErrorPhone(false); // сбрасываем ошибку при изменении
  };

  return (
    <div className={styles.Cart}>
      {items.length > 0 && <><h3>Добавленные товары</h3>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id}>
            <div className={styles.name}>{item.title}</div>
            <div className={styles.count}>x{item.count ?? 0}</div>
            <div className={styles.price}>{item.price * (item.count ?? 0)} ₽</div>
          </li>
        ))}
      </ul></>}

      {items.length < 1 && <h3>В корзине пусто</h3>}

      <form onSubmit={handleSubmit}>
        <div className={styles.action}>
          <PhoneInput value={phone} onChange={handlePhoneChange} hasError={errorPhone} />
          <button className={styles.button} type="submit">заказать</button>
        </div>
        {message && (
          <Popup
            message="Заказ успешно оформлен!"
            onClose={() => setMessage(null)}
          />
        )}
      </form>
    </div>
  );
}
