import { use, useState } from "react";
import styles from "./window.module.css";

const Window = ({ setWatch, url_key, setmoiveurl ,videoindex,setvideoindex}) => {
  if (!url_key) return null; // Don't render if no URL
  const list = url_key;
  return (
    <div className={styles["window-overlay"]}>
      <div className={styles["window-content"]}>
        <iframe
          width="100%"
          height="100%"
          src={list[videoindex]}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
        ></iframe>
      </div>
      <div
        className={styles["close-button"]}
        onClick={() => {
          setWatch(false);
          setmoiveurl("");
        }}
        role="button"
      >
        <h3>Close</h3>
      </div>
      <div className={styles["url-list"]}>
        {list.slice(0, 10).map((url, index) => (
          <div key={index} className={`${styles["url-item"]} ${videoindex === index ? styles.active : ""}`} onClick={() => setvideoindex(index)}>
            {`${index + 1} Video`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Window;
