import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import FadeLoader from "react-spinners/FadeLoader";
import styles from "../css/Home.module.scss";
import { getTrendingMovies } from "../services";

import MovieCardList from "./lists/MovieCardList";
import { ITrendingType } from "../shared/type";

const initialParams = {
  timeWindow: ITrendingType.day,
};

const TrendignMovies = () => {
  const [params, setParams] = useUrlSearchParams(initialParams);
  const [timeWindow, setTimeWindow] = useState<
    ITrendingType | null | undefined
  >(
    params.timeWindow === ITrendingType.day
      ? ITrendingType.day
      : ITrendingType.week
  );

  const { isLoading, isError, error, data } = useQuery(
    ["trendin-movies", params.timeWindow],
    () =>
      getTrendingMovies(
        params.timeWindow === ITrendingType.day
          ? ITrendingType.day
          : ITrendingType.week
      )
  );
  useEffect(() => {
    if (timeWindow) {
      setParams({ ...params, timeWindow });
    }
  }, [timeWindow, params, setParams]);

  const isDaily = timeWindow === ITrendingType.day;
  const isWeekly = timeWindow === ITrendingType.week;
  if (isError) {
    if (error instanceof Error) {
      return (
        <div className={styles.error}>
          <h2 className={styles.errorText}>
            {" "}
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }

  return (
    <section className={styles.homeContents}>
      <div className={`${styles.title} wContainer`}>
        <div>
          <h2 className={styles.headingTxt}>
            Trending Movies {isDaily ? <span>Daily</span> : <span>Weekly</span>}{" "}
          </h2>
        </div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${
              isDaily ? styles.active : styles.inactive
            }`}
            onClick={() => setTimeWindow(ITrendingType.day)}
            disabled={isDaily}>
            Daily
          </button>
          <button
            className={`${styles.btn} ${
              isWeekly ? styles.active : styles.inactive
            }`}
            onClick={() => setTimeWindow(ITrendingType.week)}
            disabled={isWeekly}>
            Weekly
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.spinner}>
          <FadeLoader />
        </div>
      ) : data ? (
        <MovieCardList data={data} />
      ) : null}
    </section>
  );
};

export default TrendignMovies;
