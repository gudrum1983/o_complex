"use client"
import React, {useRef, useEffect} from 'react';
import IMask from 'imask';
import styles from "./PhoneInput.module.css";

export default function PhoneInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: '+7(000)000-00-00',
        lazy: false,
      };

      const mask = IMask(inputRef.current, maskOptions);

      return () => {
        mask.destroy();
      };
    }
  }, []);

  return (
    <input className={styles.PhoneInput}
           ref={inputRef}
           type="tel"
           placeholder="+7(___)___-__-__"
    />
  );
};
