import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./WakaTimeEmbed.module.css";

interface WakaTimeEmbedProps {
  label: string;
  url: string;
}

export default function WakaTimeEmbed({ label, url }: WakaTimeEmbedProps): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div className={styles.card}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.imgWrapper}>
        <img
          src={url}
          alt={label}
          className={`${styles.embed} ${isDark ? styles.dark : ""}`}
        />
      </div>
    </div>
  );
}
