import { FC } from "react";
import { useQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { getMoviesByPerson } from "../services/tmdbApi";
import styles from "../css/Home.module.scss";
import MovieCardList from "./lists/MovieCardList";

interface Props {
  person_id: number;
}

const MoviesByPerson: FC<Props> = ({ person_id }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["movies-peson", person_id],
    () => getMoviesByPerson(person_id)
  );

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={styles.error}>
          <h2 className={styles.errorText}>
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }
  return (
    <div className={styles.homeContents}>
      <div className={`${styles.title} wContainer`}>
        <div>
          <h3 className={styles.headingTxt}>Known For</h3>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <FadeLoader />
        </div>
      ) : data ? (
        <MovieCardList data={data} />
      ) : null}
    </div>
  );
};

export default MoviesByPerson;
