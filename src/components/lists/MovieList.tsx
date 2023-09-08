import React, { FC, useState, Dispatch, useEffect } from "react";
import { Movies } from "../../shared/type";
import MovieCard from "../cards/MovieCard";
import styles from "../../css/SearchList.module.scss";
import PaginationButtons from "../buttons/PaginationButtons";

interface Props {
  movies: Pick<Movies, "results" | "total_pages">;
  isPreviousMoviesData: boolean;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
  genreId?: string | undefined;
}

const MovieList: FC<Props> = ({
  movies,
  isPreviousMoviesData,
  setPage,
  paramsPage,
  genreId,
}) => {
  const [moviePage, setMoviePage] = useState(1);
  useEffect(() => {
    setPage(moviePage);
    return () => {
      setPage(1);
    };
  }, [moviePage, setPage]);

  useEffect(() => {
    return () => {
      if (genreId) {
        setMoviePage(1);
      }
    };
  }, [genreId, setMoviePage]);

  return (
    <div className={styles.searchListContainer}>
      <div className={styles.searchListWrapper}>
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <PaginationButtons
        page={moviePage}
        setPage={setMoviePage}
        paramsPage={paramsPage}
        totalPages={movies.total_pages}
        isPreviousData={isPreviousMoviesData}
      />
    </div>
  );
};

export default MovieList;
