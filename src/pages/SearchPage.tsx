import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import SearchForm from "../components/forms/SearchForm";
import { getMoviesBySearch, getPersonsBySearch } from "../services";
import styles from "../css/Search.module.scss";
import { FadeLoader } from "react-spinners";
import home from "../css/Home.module.scss";
import ResultsList from "../components/lists/ResultsList";
import { IDataCategory } from "../shared/type";
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
  const [page, setPage] = useState(searchParams.page as number);
  const [query, setQuery] = useState(searchParams.query?.toString());
  const searchRef = useRef<HTMLInputElement>(null);
  const [dataCategory, setDataCategory] = useState<IDataCategory | null>(null);
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

  const isLoading = personsLoading || moviesLoading;
  const isError = personsIsError || moivesIsError;
  console.log({ dataCategory, query });
  useEffect(() => {
    setSearchParams({ ...searchParams, query, page });
  }, [query, page, searchParams]);

  useLayoutEffect(() => {
    if (
      movies?.total_results &&
      movies.total_results > 0 &&
      dataCategory !== IDataCategory.movies
    ) {
      console.log("movie");
      setDataCategory(IDataCategory.movies);
      return;
    }
    if (
      persons?.total_results &&
      persons.total_results > 0 &&
      dataCategory !== IDataCategory.people
    ) {
      console.log("people");
      setDataCategory(IDataCategory.people);
      return;
    }
    console.log("null");
    setDataCategory(null);
    return;
  }, [movies, persons]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchRef?.current?.value);
    setPage(1);
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
          dataCategory={dataCategory}
          setDataCategory={setDataCategory}
        />
        {dataCategory === IDataCategory.movies && movies && (
          <MovieList
            movies={movies}
            isPreviousMoviesData={isPreviousMoviesData}
            page={page}
            setPage={setPage}
            paramsPage={searchParams.page as number}
          />
        )}
        {dataCategory === IDataCategory.people && persons && (
          <PersonSearchList
            persons={persons}
            isPreviousPersonsData={isPreviousPersonsData}
            page={page}
            setPage={setPage}
            paramsPage={searchParams.page as number}
          />
        )}
        {!dataCategory && (
          <div className={home.error}>
            <h2 className={home.errorText}>
              No result match your search. Try again
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
