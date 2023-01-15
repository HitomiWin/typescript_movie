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
import SearchList from "../components/lists/SearchList";
import { Route, Routes, useNavigate } from "react-router-dom";
import NoMatch from "./NoMatch";
import DefaultSearchList from "../components/lists/DefaultSearchList";

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
    undefined
  );
  const isLoading = personsLoading || moviesLoading;
  const isError = personsIsError || moivesIsError;
  const navigate = useNavigate();
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
    return;
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
          query={query}
        />
        <DefaultSearchList
          persons={persons}
          movies={movies}
          checkedValue={checkedValue}
          // isPreviousMoviesData={isPreviousMoviesData}
          // isPreviousPersonsData={isPreviousPersonsData}
          // page={page}
          // setPage={setPage}
          paramsPage={searchParams.page as number}
        />
        <Routes>
          <Route
            path="movies"
            element={
              <SearchList type={"movies"} data={checkedValue} defaultPage={1} />
            }
          />
          <Route
            path="persons"
            element={
              <SearchList
                type={"persons"}
                data={checkedValue}
                defaultPage={1}
              />
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
};

export default SearchPage;
