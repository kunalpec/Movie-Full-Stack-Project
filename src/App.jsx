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
  const [moiveurl, setmoiveurl] = useState("");
  const [page,setpage]=useState(2);

  // const sending_genre = {
  //   Action: "action",
  //   Comedy: "comedy",
  //   Drama: "drama",
  //   Horror: "horror",
  //   Romance: "romance",
  //   Thriller: "thriller",
  //   Sci: "science",
  //   Fantasy: "fantasy",
  //   Animation: "animation",
  //   Adventure: "adventure",
  //   Crime: "crime",
  // };

  const handleClick = (genre) => {
    setSelectedGenre(genre);
    setSelectedMovie("");
    setpage(2);
    console.log(`Show genre for: ${genre}`);
  };

  const handleMovieClick = (title) => {
    setSelectedMovie(title);
    setSelectedGenre("");
    setpage(2);
    console.log(`Show moive for: ${title}`);
  };

  const onclickmore = () => {
    setFetchMore(true);
    setpage(page + 1);
    console.log(selectedGenre || selectedMovie);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWatchClick = (title) => {
    setWatch(true);
    setmoivewatch(title);
    scrollToTop();
    console.log(watch);
    console.log("Watch button clicked for:", title);
  };


  // Fetch YouTube URL for the selected movie
  useEffect(() => {
    if (!moivewatch) return;

    const geturlMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/youtube_url/", {
          params: { name: moivewatch },
        });
        setmoiveurl(res.data.url);
        console.log(moiveurl);
      } catch (err) {
        console.error(err);
      }
    };

    geturlMovies();
  }, [moivewatch]);

  // Fetch more movies when "More" is clicked
  useEffect(() => {
    if (!fetchMore || (!selectedGenre && !selectedMovie)) return;

    const getMoreMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/more_movies/", {
          params: { name:selectedGenre || selectedMovie,
            page:page
           },
        });
        setResults((prevResults) =>
          [...prevResults, ...res.data].filter(
            (movie, i, self) =>
              i === self.findIndex((m) => m.title === movie.title)
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setFetchMore(false);
      }
    };

    getMoreMovies();
  }, [fetchMore, selectedGenre, selectedMovie]);

  // Fetch movies by title
  useEffect(() => {
    if (!selectedMovie.trim()) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/movies/", {
          params: { name: selectedMovie },
        });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [selectedMovie]);

  // Fetch movies by genre
  useEffect(() => {
    if (!selectedGenre) return;

    const fetchGenre = async () => {
      try {

        const res = await axios.get("http://127.0.0.1:8000/genres/", {
          params: { name: selectedGenre},
        });
        setResults(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenre();
  }, [selectedGenre]);

  // Default data
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
      <Header />
      <Type handleMovieClick={handleMovieClick} />
      {watch && <Window setWatch={setWatch} url_key={moiveurl} />}
      <div className="main">
        <div className="container">
          {results.length > 0
            ? results.map((movie) => (
                <Card
                  key={movie.title}
                  poster_path={movie.poster}
                  title={movie.title}
                  handleMovieClick={handleMovieClick}
                  handleWatchClick={() => handleWatchClick(movie.title)}
                />
              ))
            : data.map((temp) => (
                <Card
                  key={temp.title}
                  poster_path={temp.poster}
                  title={temp.title}
                  handleMovieClick={handleMovieClick}
                  handleWatchClick={() => handleWatchClick(temp.title)}
                />
              ))}
        </div>

        <div className="genreContainer">
          <Gener selectedGenre={selectedGenre} handleClick={handleClick} />
        </div>
      </div>
      <More onclickmore={onclickmore} />
    </>
  );
};

export default App;
