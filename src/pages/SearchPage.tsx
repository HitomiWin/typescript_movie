import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useUrlSearchParams, InitialType } from "use-url-search-params";
import SearchForm from "../components/forms/SearchForm";
import { getMoviesBySearch, getPersonsBySearch } from "../services";

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
    isPreviousData: isPreviousPersonssData,
  } = useQuery(
    ["person-search", searchParams],
    () => getPersonsBySearch(searchParams),
    {
      keepPreviousData: true,
    }
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef?.current?.value) {
      return;
    }
  };

  console.log({ movies, persons });
  useEffect(() => {
    setSearchParams({ ...searchParams, query, page });
  }, [query, page]);

  return (
    <>
      <SearchForm
        initialValue={query}
        handleSubmit={handleSubmit}
        searchRef={searchRef}
      />
    </>
  );
};

export default SearchPage;
