import { FC, Dispatch } from "react";
import { Movies, People } from "../../shared/type";
import MovieCard from "../cards/MovieCard";
import PersonCard from "../cards/PersonCard";
import styles from "../../css/SearchList.module.scss";
import PaginationButtons from "../buttons/PaginationButtons";

interface Props {
  persons: People | undefined;
  movies: Movies | undefined;
  checkedValue: People | Movies | undefined;
  isPreviousMoviesData: boolean;
  isPreviousPersonsData: boolean;
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>;
  paramsPage: number | undefined;
}
const SearchList: FC<Props> = ({
  persons,
  movies,
  checkedValue,
  isPreviousMoviesData,
  isPreviousPersonsData,
  page,
  setPage,
  paramsPage,
}) => {
  if (checkedValue === movies) {
    if (!movies) {
      return (
        <>
          <p> No result match your search. Try again</p>
        </>
      );
    }
    return (
      <div className={styles.searchListContainer}>
        <div className={styles.searchListWrapper}>
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <PaginationButtons
          page={page}
          setPage={setPage}
          paramsPage={paramsPage}
          totalPages={movies.total_pages}
          isPreviousData={isPreviousMoviesData}
        />
      </div>
    );
  }
  if (checkedValue === persons) {
    if (!persons) {
      return (
        <>
          <p> No result match your search. Try again</p>
        </>
      );
    }
    return (
      <div className={styles.searchListContainer}>
        <div className={styles.searchListWrapper}>
          {persons?.results.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
        <PaginationButtons
          page={page}
          setPage={setPage}
          paramsPage={paramsPage}
          totalPages={persons.total_pages}
          isPreviousData={isPreviousPersonsData}
        />
      </div>
    );
  }
  return (
    <>
      <p> No result match your search. Try again</p>
    </>
  );
};

export default SearchList;
