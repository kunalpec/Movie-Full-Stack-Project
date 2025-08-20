import styles from "./moive_card.module.css";
import { RiPlayLargeFill } from "react-icons/ri";
const Card = ({ poster_path, title, handleMovieClick ,handleWatchClick}) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const imageUrl = `${IMAGE_BASE_URL}${poster_path}`;

  return (
    <div
      className={styles["movie-card"]}
      role="button"
      tabIndex={0}
    >
      <img src={imageUrl} alt={`Poster of ${title}`} onClick={() => {handleMovieClick(title)}}/>
      <div className={styles.watch} role="button" onClick={() => {handleWatchClick(title)}}>
        <h3><span className={styles["icon"]}><RiPlayLargeFill /></span> Trailer</h3>
      </div>
      <h3 className={styles["title"]}>{title}</h3>
    </div>
  );
};

export default Card;
