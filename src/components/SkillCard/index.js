import React from "react";
import styles from "./SkillCard.module.css";

export default function SkillCard({ title, img, textBadge, description, gradient }) {
  return (
    <div className={styles.card}>
      <div className={styles.background} style={{ background: gradient }} />

      <div className={styles.logo}>
        {img ? (
          <img src={img} alt={title} className={styles.logoImg} />
        ) : (
          <span className={styles.textBadge}>{textBadge}</span>
        )}
      </div>

      <div className={styles.box}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
