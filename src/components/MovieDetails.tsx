import { FC } from "react";
import { Movie } from "../shared/type";

import styles from "../css/Movie.module.scss";
interface Props {
  readonly movie: Movie;
}
const MovieDetails: FC<Props> = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;
  const backdropUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
    : null;

  const director = movie.credits.crew.find(({ job }) => job === "Director");
  const crewArray = movie.credits.crew.sort(function (a, b) {
    return b.popularity - a.popularity;
  });
  const topFiveCrew = crewArray
    .filter(
      (crew, i, self) =>
        self.findIndex((c) => c.id === crew.id) === i && crew.job !== "Director"
    )
    .slice(0, 5);
  const topFiveCrewWithDirector = director
    ? [director, ...topFiveCrew]
    : [...topFiveCrew];

  return (
    <>
      <div className={`${styles.imgText}`}>
        {backdropUrl && (
          <img className={`${styles.backgroundImg}`} src={backdropUrl} alt="" />
        )}
        <div className={`${styles.imgTextContainer}  wContainer`}>
          <img
            className={styles.img}
            src={posterUrl ?? "../../images/no-image-icon-23485.png"}
            alt=""
          />
          <div className={styles.text}>
            <div className={styles.textContents}>
              <h2 className={styles.head}>{movie.title}</h2>
              <p>
                Release: {movie.release_date} / {movie.runtime?.toString()} mins
              </p>
              <p>{movie.genres.map(({ name }) => name).join(" ")}</p>
            </div>
            <div className={styles.textContents}>
              <h3 className={styles.head}>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div className={styles.textContents}>
              <h3 className={styles.head}>Crew</h3>
              <div className={styles.crewNameJobContainer}>
                {topFiveCrewWithDirector.map(({ name, job }, i) => (
                  <div className={styles.crewNameJob} key={i}>
                    <p>{name}</p>
                    <p>{job}</p>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
