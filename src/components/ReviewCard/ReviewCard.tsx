import styles from "./ReviewCard.module.css";
import React from "react";

export default function ReviewCard({html}: { html: string }) {
  return (
    <div className={styles.ReviewCard}>
      <div className={styles.content} dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  );
}
