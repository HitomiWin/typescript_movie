import { FC, useState, Dispatch } from "react";
import { Movies } from "../../shared/type";
import MovieCard from "../cards/MovieCard";
import styles from "../../css/SearchList.module.scss";

interface Props {
  movies: Movies;
  isPreviousMoviesData: boolean;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
}

const MovieSearchList: FC<Props> = ({
  movies,
  isPreviousMoviesData,
  page,
  setPage,
  paramsPage,
}) => {
  const [moviePage, setMoviePage] = useState(1);
  return (
    <div className={styles.searchListContainer}>
      <div className={styles.searchListWrapper}>
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearchList;
