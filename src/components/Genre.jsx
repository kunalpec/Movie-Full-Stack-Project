import React from "react";
import styles from "./Genre.module.css";

const Genre = ({ selectedGenre, handleClick }) => {
  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Thriller",
    "Science",
    "Fantasy",
    "Animation",
    "Adventure",
    "Crime",
  ];

  return (
    <div className={styles.genreContainer}>
      <h2 className={styles.heading}>Genres</h2>
      <ul className={styles.genreList}>
        {genres.map((genre, index) => (
          <li
            key={index}
            className={`${styles.genreItem} ${
              selectedGenre === genre ? styles.active : ""
            }`}
            onClick={() => handleClick(genre)}
            role="button"
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
