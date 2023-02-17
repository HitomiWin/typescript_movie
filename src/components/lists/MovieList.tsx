import { FC, useState, Dispatch, useEffect } from "react";
import { Movies } from "../../shared/type";
import MovieCard from "../cards/MovieCard";
import styles from "../../css/SearchList.module.scss";
import PaginationButtons from "../buttons/PaginationButtons";

interface Props {
  movies: Movies;
  isPreviousMoviesData: boolean;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
}

const MovieList: FC<Props> = ({
  movies,
  isPreviousMoviesData,
  page,
  setPage,
  paramsPage,
}) => {
  const [moviePage, setMoviePage] = useState(page);
  useEffect(() => {
    setPage(moviePage);
  }, [moviePage]);

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
