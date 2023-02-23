export enum ITrendingType {
  day = "day",
  week = "week",
}

export enum ICategoryType {
  popular = "popular",
  now_playing = "now_playing",
  top_rated = "top_rated",
}

export enum ICategoryTitle {
  popular = "What's Popular",
  now_playing = "Playing Now",
  top_rated = "Top 20",
}

export enum IDataCategory {
  people = "people",
  movies = "movies",
}

export interface Movie {
  poster_path: string | null;
  backdrop_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genres: Genre[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  runtime: number | undefined;
  credits: Credits;
}

export interface Movies {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface People {
  page: number;
  total_results: number;
  total_pages: number;
  results: Cast[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  title: string;
  also_known_as: string[];
  biography: string;
  place_of_birth: string;
  birthday: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  poster_path: string;
}

export interface Crew {
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface SearchQueryArg {
  query: string;
  page: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}
