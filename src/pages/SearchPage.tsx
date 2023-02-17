import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import SearchForm from "../components/forms/SearchForm";
import { getMoviesBySearch, getPersonsBySearch } from "../services";
import styles from "../css/Search.module.scss";
import { FadeLoader } from "react-spinners";
import home from "../css/Home.module.scss";
import ResultsList from "../components/lists/ResultsList";
import { Movies, People } from "../shared/type";
import MovieList from "../components/lists/MovieList";
import PersonSearchList from "../components/lists/PersonSearchList";

const SearchPage = () => {
  const types = {
    query: String,
    page: Number,
  };
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { query: undefined, page: undefined },
    types
  );

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(searchParams.query?.toString());
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    data: movies,
    isLoading: moviesLoading,
    isError: moivesIsError,
    error: moviesError,
    isPreviousData: isPreviousMoviesData,
  } = useQuery(
    ["movies-search", searchParams],
    () => getMoviesBySearch(searchParams),
    {
      keepPreviousData: true,
    }
  );
  const {
    data: persons,
    isLoading: personsLoading,
    isError: personsIsError,
    error: personsError,
    isPreviousData: isPreviousPersonsData,
  } = useQuery(
    ["person-search", searchParams],
    () => getPersonsBySearch(searchParams),
    {
      keepPreviousData: true,
    }
  );
  const [checkedValue, setCheckedValue] = useState<People | Movies | undefined>(
    movies
  );
  const isLoading = personsLoading || moviesLoading;
  const isError = personsIsError || moivesIsError;

  useEffect(() => {
    setSearchParams({ ...searchParams, query, page });
  }, [query, page, setSearchParams, searchParams]);

  useLayoutEffect(() => {
    if (movies?.total_results && movies.total_results > 0) {
      setCheckedValue(movies);
      return;
    }
    if (persons?.total_results && persons.total_results > 0) {
      setCheckedValue(persons);
      return;
    }
    setCheckedValue(undefined);
  }, [movies, persons]);

  const onChangeAttribute = (value: People | Movies | undefined) => {
    setCheckedValue(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef?.current?.value) {
      return;
    }
    setQuery(searchRef.current.value);
  };

  if (isLoading) {
    return (
      <div className={home.spinner}>
        <FadeLoader />
      </div>
    );
  }
  if (isError) {
    if (personsError instanceof Error || moviesError instanceof Error) {
      return (
        <div className={home.error}>
          <h2 className={home.errorText}>
            Something went wrong. Please reload the page.
          </h2>
        </div>
      );
    }
  }
  const isMovies = checkedValue === movies;
  const isPersons = checkedValue === persons;

  return (
    <div className={`${styles.searchPageContainer} wContainer`}>
      <SearchForm
        initialValue={query}
        handleSubmit={handleSubmit}
        searchRef={searchRef}
      />
      <div className={styles.contentWrapper}>
        <ResultsList
          persons={persons}
          movies={movies}
          checkedValue={checkedValue}
          onChangeAttribute={onChangeAttribute}
        />
        {isMovies && movies && (
          <MovieList
            movies={movies}
            isPreviousMoviesData={isPreviousMoviesData}
            page={page}
            setPage={setPage}
            paramsPage={searchParams.page as number}
          />
        )}
        {isPersons && persons && (
          <PersonSearchList
            persons={persons}
            isPreviousPersonsData={isPreviousPersonsData}
            page={page}
            setPage={setPage}
            paramsPage={searchParams.page as number}
          />
        )}
        {!checkedValue && <p> No result match your search. Try again</p>}
      </div>
    </div>
  );
};

export default SearchPage;
