import React from "react";
import { motion } from "framer-motion";
import styles from "./StatCard.module.css";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

export default function StatCard({ icon, value, label }: StatCardProps): JSX.Element {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(221,117,150,0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </motion.div>
  );
}
