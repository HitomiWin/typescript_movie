import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import { useQuery } from "react-query";
import { getGenre } from "../services/tmdbApi";
import { Genres, Genre } from "../shared/type";

interface GenreContextProps {
  genreId: Genre["id"] | null;
  getGenreId: (id: Genre["id"] | null) => void;
  genreName: Genre["name"];
  getGenreName: (name: Genre["name"]) => void;
  genres: Genres[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

interface Props {
  children: ReactNode;
}

const GenresContext = createContext({} as GenreContextProps);

export const useGenresContext = () => {
  return useContext(GenresContext);
};

const GenresContextProvider: FC<Props> = ({ children }) => {
  const {
    data: genres,
    isLoading,
    isError,
    error,
  } = useQuery("genre", () => getGenre(), {
    staleTime: 1000 * 60 * 10, // 10 mins // stop to refetch unnecessarily
    cacheTime: 1000 * 60 * 60 * 1, // 1 hors // because ganre dosen't need to get often
  });
  const [genreId, setGenreId] = useState<number | null>(null);
  const [genreName, setGenreName] = useState<string>("");

  useEffect(() => {
    if (genres) {
      setGenreId(genres.genres[0].id);
      setGenreName(genres.genres[0].name);
    }
  }, [genres]);

  const getGenreId = (id: Genre["id"] | null) => {
    setGenreId(id);
  };
  const getGenreName = (name: Genre["name"]) => {
    setGenreName(name);
  };

  const values = {
    genreId,
    getGenreId,
    genreName,
    getGenreName,
    genres,
    isLoading,
    isError,
    error,
  };
  return (
    <GenresContext.Provider value={values}>{children}</GenresContext.Provider>
  );
};

export default GenresContextProvider;
