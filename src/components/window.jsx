import styles from "./window.module.css";

const Window = ({ setWatch, url_key }) => {
  if (!url_key) return null; // Don't render if no URL

  return (
    <div className={styles["window-overlay"]}>
      <div className={styles["window-content"]}>
        <iframe
          width="100%"
          height="100%"
          src={url_key}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div
        className={styles["close-button"]}
        onClick={() => setWatch(false)}
        role="button"
      >
        <h3>Close</h3>
      </div>
    </div>
  );
};

export default Window;
