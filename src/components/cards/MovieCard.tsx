import { FC } from "react";
import { Movie } from "../../shared/type";
import styles from "../../css/CardList.module.scss";

interface Props {
  movie: Movie;
}

const MovieCard: FC<Props> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <>
      <article className={styles.card}>
        <figure>
          <img
            src={posterUrl ?? "../../images/no-image-icon-23485.png"}
            alt=""
            width={posterUrl ? "500" : "200"}
          />
        </figure>
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </article>
    </>
  );
};

export default MovieCard;
