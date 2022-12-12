import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import FadeLoader from "react-spinners/FadeLoader";
import styles from "../css/Home.module.scss";

import MovieCardList from "./lists/MovieCardList";

import { getTrendingMovies } from "../services/tmdbApi";
import { ETrendingType } from "../shared/type";

const initialParams = {
  timeWindow: ETrendingType.day,
};

const TrendignMovies = () => {
  const [params, setParams] = useUrlSearchParams(initialParams);
  const [timeWindow, setTimeWindow] = useState<
    ETrendingType | null | undefined
  >(
    params.timeWindow === ETrendingType.day
      ? ETrendingType.day
      : ETrendingType.week
  );

  const { isLoading, data } = useQuery(
    ["trendin-movies", params.timeWindow],
    () =>
      getTrendingMovies(
        params.timeWindow === ETrendingType.day
          ? ETrendingType.day
          : ETrendingType.week
      )
  );
  useEffect(() => {
    if (timeWindow) {
      setParams({ ...params, timeWindow });
    }
  }, [timeWindow, params, setParams]);

  const isDaily = timeWindow === ETrendingType.day;
  const isWeekly = timeWindow === ETrendingType.week;

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
            onClick={() => setTimeWindow(ETrendingType.day)}
            disabled={isDaily}>
            Daily
          </button>
          <button
            className={`${styles.btn} ${
              isWeekly ? styles.active : styles.inactive
            }`}
            onClick={() => setTimeWindow(ETrendingType.week)}
            disabled={isWeekly}>
            Weekly
          </button>
        </div>
      </div>
      {isLoading ? <FadeLoader /> : data ? <MovieCardList data={data} /> : null}
    </section>
  );
};

export default TrendignMovies;
