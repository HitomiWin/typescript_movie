import React, { FC } from "react";
import { useQuery } from "react-query";
import { getMoviesByPerson } from "../services/tmdbApi";
import styles from "../css/Home.module.scss";
import base from "../css/Base.module.scss";
import MovieCardList from "./lists/MovieCardList";
import Loader from "./Loader";

interface Props {
  readonly person_id: number;
}

const MoviesByPerson: FC<Props> = ({ person_id }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["movies-peson", person_id],
    () => getMoviesByPerson(person_id),
  );

  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={base.error}>
          <h2 className={base.errorText}>
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
      {isLoading ? <Loader /> : data ? <MovieCardList data={data} /> : null}
    </div>
  );
};

export default MoviesByPerson;
