import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/moive_card";
import Header from "./components/Header";
import Gener from "./components/gener";
import Type from "./components/type";
import More from "./components/more";
import Window from "./components/window";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [results, setResults] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const [watch, setWatch] = useState(false);
  const [moivewatch, setmoivewatch] = useState("");
  const [moiveurl, setmoiveurl] = useState([]);
  const [page, setpage] = useState(2);
  const [movieId, setMovieId] = useState("");
  const [videoindex, setvideoindex] = useState(0);
  const [click_genre, setclick_genre] = useState(false);

  // handle genre selection
  const handleClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedMovie("");
    setpage(2);
    console.log(`Show genre for: ${genre}`);
  };

  // handle movie selection
  const handleMovieClick = (title) => {
    setSelectedMovie(title);
    setSelectedGenre("");
    setpage(2);
    scrollToTop(600);
    console.log(`Show movie for: ${title}`);
  };

  const onclickmore = () => {
    setFetchMore(true);
    setpage(page + 1);
    console.log("Fetching more for:", selectedGenre || selectedMovie);
  };

  const scrollToTop = (top_index) => {
    window.scrollTo({ top: top_index, behavior: "smooth" });
  };

  const handleWatchClick = (title) => {
    setWatch(true);
    setmoivewatch(title);
    scrollToTop(140);
    setvideoindex(0);
    console.log("Watch button clicked for:", title);
  };

  const handlegenreClick = () => {
    setclick_genre(!click_genre);
    console.log("Genre button clicked:", click_genre);
  };

  // 🔹 Fetch YouTube URL if movie is selected
  useEffect(() => {
    if (!moivewatch || movieId === "") return;
    // else fetch from TMDB
    const fetchMovieVideos = async () => {
      try {
        const API_KEY = "6c29b17d7336b425da5490f97a806522";
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const youtubeVideo = data.results
            .filter((video) => video.site === "YouTube")
            .map((video) => video.key);

          if (youtubeVideo.length > 0) {
            const youtubeUrl = youtubeVideo.map(
              (links) => `https://www.youtube.com/embed/${links}`
            );
            setmoiveurl(youtubeUrl);
            console.log("YouTube URL cached:", youtubeUrl);
          }
        } else {
          console.log("No videos found for:", moivewatch);
        }
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
      } finally {
        setMovieId(""); // reset after fetch
      }
    };

    fetchMovieVideos();
  }, [moivewatch, movieId]);

  // 🔹 Fetch movieId from Django API
  useEffect(() => {
    if (!moivewatch) return;

    const geturlMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/youtube_url/", {
          params: { name: moivewatch },
        });
        setMovieId(res.data.id);
        console.log("Fetched movieId:", res.data.id);
      } catch (err) {
        console.error("Error fetching movieId:", err);
      }
    };

    geturlMovies();
  }, [moivewatch]);

  // 🔹 Fetch more movies when "More" is clicked
  useEffect(() => {
    if (!fetchMore || (!selectedGenre && !selectedMovie)) return;

    const getMoreMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/more_movies/", {
          params: { name: selectedGenre || selectedMovie, page: page },
        });

        setResults((prev) =>
          [...prev, ...res.data].filter(
            (movie, i, self) =>
              i === self.findIndex((m) => m.title === movie.title)
          )
        );
      } catch (err) {
        console.error("Error fetching more movies:", err);
      } finally {
        setFetchMore(false);
      }
    };

    getMoreMovies();
  }, [fetchMore, selectedGenre, selectedMovie]);

  // 🔹 Fetch movies by title
  useEffect(() => {
    if (!selectedMovie.trim()) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/movies/", {
          params: { name: selectedMovie },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchMovies();
  }, [selectedMovie]);

  // 🔹 Fetch movies by genre
  useEffect(() => {
    if (!selectedGenre) return;

    const fetchGenre = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/genres/", {
          params: { name: selectedGenre },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching genre:", err);
      }
    };

    fetchGenre();
  }, [selectedGenre]);

  // 🔹 Default data
  const data = [
    { title: "Iron Man", poster: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" },
    {
      title: "Avengers: The Kang Dynasty",
      poster: "/utZTb3VBrH0zR77BcISU67pHuAx.jpg",
    },
    { title: "Fantastic Four", poster: "/jatnqRPnxjg2Q6cFsAjmrBNhx9.jpg" },
    {
      title: "Avengers: Secret Wars",
      poster: "/8chwENebfUEJzZ7sMUA0nOgiCKk.jpg",
    },
    {
      title: "Inhumans: The First Chapter",
      poster: "/cIvgEUM9DjTcgttmDkfi0sk6oxQ.jpg",
    },
  ];

  return (
    <>
      <Header
        tpp={<Type handleMovieClick={handleMovieClick} />}
        handlegenreClick={handlegenreClick}
        click_genre={click_genre}
      />
      {click_genre && (
        <div className="genreContainer">
          <Gener selectedGenre={selectedGenre} handleClick={handleClick} />
        </div>
      )}
      {watch && (
        <Window
          setWatch={setWatch}
          url_key={moiveurl}
          setmoiveurl={setmoiveurl}
          videoindex={videoindex}
          setvideoindex={setvideoindex}
        />
      )}

      <div className="container">
        {results.length > 0
          ? results.map((movie, index) => (
              <Card
                key={index}
                poster_path={movie.poster}
                title={movie.title}
                handleMovieClick={handleMovieClick}
                handleWatchClick={() => handleWatchClick(movie.title)}
              />
            ))
          : data.map((temp, index) => (
              <Card
                key={index}
                poster_path={temp.poster}
                title={temp.title}
                handleMovieClick={handleMovieClick}
                handleWatchClick={() => handleWatchClick(temp.title)}
              />
            ))}
      </div>

      <More onclickmore={onclickmore} />
    </>
  );
};

export default App;
