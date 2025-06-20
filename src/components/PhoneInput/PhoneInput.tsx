"use client";

import React, { useRef, useEffect } from "react";
import IMask from "imask";
import styles from "./PhoneInput.module.css";

export default function PhoneInput({
                                     value,
                                     onChange,
                                     hasError = false,
                                   }: {
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<ReturnType<typeof IMask> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: "+7(000)000 00-00",
        lazy: false,
      };

      const mask = IMask(inputRef.current, maskOptions);
      maskRef.current = mask;

      mask.on("accept", () => {
        onChange(mask.unmaskedValue);
      });

      return () => {
        mask.destroy();
      };
    }
  }, [onChange]);

  useEffect(() => {
    if (maskRef.current && value !== maskRef.current.unmaskedValue) {
      maskRef.current.unmaskedValue = value;
    }
  }, [value]);

  const classes = `${styles.PhoneInput} ${hasError ? styles.error : ""}`;

  console.log("classes", classes)

  return (
    <input
      className={classes}
      ref={inputRef}
      type="tel"
      placeholder="+7(___)___ __-__"
    />
  );
}