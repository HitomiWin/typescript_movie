import axios from "axios";
import {
  ITrendingType,
  ICategoryType,
  Movies,
  Movie,
  Cast,
  People,
  Genres,
} from "../shared/type";
import { InitialType } from "use-url-search-params";

//access to api key
const API_KEY = process.env.REACT_APP_API_KEY;
axios.defaults.baseURL = `https://api.themoviedb.org/3`;

const get = async (endpoint: string) => {
  const response = await axios.get(endpoint);
  return response.data;
};

export const getCategorizedMovies = async (
  type: ICategoryType
): Promise<Movies> => {
  return get(
    `/movie/${type}?api_key=${API_KEY}&region=us&language=en-US&include_adult=false`
  );
};

export const getGenre = async (): Promise<Genres> => {
  return get(`/genre/movie/list?api_key=${API_KEY}&region=us&language=en-US`);
};

export const getMoviesByGenre = async (genreId = 1, page = 1) => {
  return get(
    `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}&language=en-US&region=us`
  );
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  return get(
    `/movie/${id}?api_key=${API_KEY}&append_to_response=credits&include_adult=false`
  );
};

export const getMovie = async (id: number) => {
  return get(`/movie/${id}?api_key=${API_KEY}&include_adult=false`);
};

export const getPerson = async (person_id: number): Promise<Cast> => {
  return get(`/person/${person_id}?api_key=${API_KEY}&language=en-US`);
};

export const getMoviesByPerson = async (person_id: number): Promise<Movies> => {
  return get(
    `/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&with_people=${person_id}`
  );
};

export const getRelatedMovies = async (movie_id: number): Promise<Movies> => {
  return get(
    `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
  );
};

export const getMoviesBySearch = async ({
  query,
  page,
}: InitialType): Promise<Movies> => {
  return query
    ? get(
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false&sort_by=popularity.desc`
      )
    : null;
};
export const getPersonsBySearch = async ({
  query,
  page,
}: InitialType): Promise<People> => {
  return query
    ? get(
        `/search/person?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}}&include_adult=false&sort_by=popularity.desc`
      )
    : null;
};

export const getTrendingMovies = async (
  time_window: ITrendingType
): Promise<Movies> => {
  return get(
    `/trending/movie/${time_window}?api_key=${API_KEY}&include_adult=false`
  );
};
