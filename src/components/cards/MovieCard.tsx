import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../shared/type";
import styles from "../../css/CardList.module.scss";
import useLocalStorage from "../../hooks/useLocalStorage";

interface Props {
  movie: Movie;
}

const MovieCard: FC<Props> = ({ movie }) => {
  const [savedMovies, setSavedMovies] = useLocalStorage("movies", []);
  const navigate = useNavigate();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "../../images/no-image-icon-23485.png";

  const handleOnClick = () => {
    if (savedMovies.length > 10) {
      setSavedMovies((prev: number[]) => prev.slice(0, 10));
    }
    setSavedMovies((prev: number[]) => [
      {
        id: movie.id,
      },
      ...prev,
    ]);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <>
      <article className={styles.card} onClick={handleOnClick}>
        <figure>
          <img src={posterUrl} alt="" width="200" />
        </figure>
        <div className={styles.cardTitle}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      </article>
    </>
  );
};

export default MovieCard;
