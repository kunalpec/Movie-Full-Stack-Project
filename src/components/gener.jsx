import React, { useState } from "react";
import styles from "./gener.module.css";
import { RiAddLargeLine } from "react-icons/ri";
const Gener = ({selectedGenre,handleClick}) => {
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
    "Crime"
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
          >
            <span className={styles.icon}><RiAddLargeLine /></span>{genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gener;