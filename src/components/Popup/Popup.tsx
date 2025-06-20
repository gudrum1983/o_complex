"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  message: string;
  onClose: () => void;
}

export default function Popup({ message, onClose }: PopupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 👇 Блокируем прокрутку
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // 👈 добавь это
    return () => {
      // 👇 Возвращаем обратно
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button onClick={onClose}>закрыть</button>
      </div>
    </div>,
    document.getElementById("popup-root")!
  );
}
