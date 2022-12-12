import axios from "axios";
import { ETrendingType, ECategoryType, Data } from "../shared/type";

//access to api key
const API_KEY = process.env.REACT_APP_API_KEY;
axios.defaults.baseURL = `https://api.themoviedb.org/3`;

const get = async (endpoint: string) => {
  const response = await axios.get(endpoint);
  return response.data;
};

export const getCategorizedMovies = async (
  type: ECategoryType
): Promise<Data> => {
  return get(`/movie/${type}?api_key=${API_KEY}&region=us&language=en-US`);
};

export const getGenre = async () => {
  return get(`/genre/movie/list?api_key=${API_KEY}&region=us&language=en-US`);
};

export const getMoviesByGenre = async (genreId: number, page = 1) => {
  return get(
    `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genreId}&language=en-US&region=us`
  );
};

export const getMovieDetails = async (id: number) => {
  return get(`/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
};

export const getMovie = async (id: number) => {
  return get(`/movie/${id}?api_key=${API_KEY}`);
};

export const getPerson = async (person_id: number) => {
  return get(`/person/${person_id}?api_key=${API_KEY}&language=en-US`);
};

export const getMoviesByPerson = async (person_id: number) => {
  return get(
    `/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&with_people=${person_id}`
  );
};

export const getRelatedMovies = async (movie_id: number) => {
  return get(
    `/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`
  );
};

export const getMoviesBySearch = async ({ query = null, page = 1 }) => {
  return query
    ? get(
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
      )
    : null;
};

export const getTrendingMovies = async (
  time_window: ETrendingType
): Promise<Data> => {
  return get(`/trending/movie/${time_window}?api_key=${API_KEY}`);
};

// eslint-disable-next-line
export default {
  getCategorizedMovies,
  getGenre,
  getMoviesByGenre,
  getMovieDetails,
  getPerson,
  getMoviesByPerson,
  getRelatedMovies,
  getMoviesBySearch,
  getTrendingMovies,
  getMovie,
};
