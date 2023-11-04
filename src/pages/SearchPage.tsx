import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams } from "use-url-search-params";
import SearchForm from "../components/forms/SearchForm";
import { getMoviesBySearch, getPersonsBySearch } from "../services";
import styles from "../css/Search.module.scss";
import base from "../css/Base.module.scss";
import ResultsList from "../components/lists/ResultsList";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IDataCategory } from "../shared/type";
import MovieList from "../components/lists/MovieList";
import PersonSearchList from "../components/lists/PersonSearchList";
import NoMatch from "./NoMatch";
import Loader from "../components/Loader";
import NoQuery from "./NoQuery";

const SearchPage = () => {
  const types = {
    query: String,
    page: Number,
  };
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useUrlSearchParams(
    { query: undefined, page: undefined },
    types,
  );
  const [page, setPage] = useState(1);
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
    },
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
    },
  );

  const isLoading = personsLoading || moviesLoading;
  const isError = personsIsError || moivesIsError;

  useEffect(() => {
    setSearchParams({ ...searchParams, query, page });
  }, [query, page, searchParams, setSearchParams]);

  const isMovies = movies && movies.total_results > 0;
  const isPeople = persons && persons.total_results > 0;

  useEffect(() => {
    if (isMovies) {
      setDataCategory(IDataCategory.movies);
      navigate(`/search/movies?query=${query}&page=1`);
      return;
    }
    if (isPeople) {
      setDataCategory(IDataCategory.people);
      navigate(`/search/people?query=${query}&page=1`);
      return;
    }
    setPage(1);
    setDataCategory(null);
    // eslint-disable-next-line
  }, [query, isMovies, isPeople]);

  useEffect(() => {
    Element.prototype.scrollTo = () => {};
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
    // eslint-disable-next-line
  }, [page]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchRef?.current?.value);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    if (personsError instanceof Error || moviesError instanceof Error) {
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
    <div className={`${styles.searchPageContainer} wContainer`}>
      <SearchForm
        initialValue={query}
        handleSubmit={handleSubmit}
        searchRef={searchRef}
      />
      {!query || query === "" ? (
        <NoQuery />
      ) : (
        <div className={styles.contentWrapper}>
          <ResultsList
            persons={persons}
            movies={movies}
            query={query}
            page={page}
            dataCategory={dataCategory}
          />
          <Routes>
            <Route
              path="/"
              element={
                isMovies ? (
                  <MovieList
                    movies={movies}
                    isPreviousMoviesData={isPreviousMoviesData}
                    page={page}
                    setPage={setPage}
                    paramsPage={searchParams.page as number}
                  />
                ) : isPeople ? (
                  <PersonSearchList
                    persons={persons}
                    isPreviousPersonsData={isPreviousPersonsData}
                    page={page}
                    setPage={setPage}
                    paramsPage={searchParams.page as number}
                  />
                ) : (
                  <NoMatch />
                )
              }
            />
            <Route
              path="movies"
              element={
                movies && movies.total_results > 0 ? (
                  <MovieList
                    movies={movies}
                    isPreviousMoviesData={isPreviousMoviesData}
                    page={page}
                    setPage={setPage}
                    paramsPage={searchParams.page as number}
                  />
                ) : (
                  <NoMatch />
                )
              }
            />
            <Route
              path="people"
              element={
                persons && persons.total_results > 0 ? (
                  <PersonSearchList
                    persons={persons}
                    isPreviousPersonsData={isPreviousPersonsData}
                    page={page}
                    setPage={setPage}
                    paramsPage={searchParams.page as number}
                  />
                ) : (
                  <NoMatch />
                )
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
