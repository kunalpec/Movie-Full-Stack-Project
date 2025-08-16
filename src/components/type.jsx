import { useState } from "react";
import styles from "./type.module.css";

const Type = ({ handleMovieClick }) => {
  const [inputMovie, setInputMovie] = useState("");

  const handleSearch = () => {
    if (inputMovie.trim() === "") return;
    handleMovieClick(inputMovie);
    setInputMovie("");
  };

  return (
    <div className={styles["type-container"]}>
      <input
        type="text"
        value={inputMovie}
        onChange={(e) => setInputMovie(e.target.value)}
        placeholder="Enter movie name..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Type;