export enum ETrendingType {
  day = "day",
  week = "week",
}

export enum ECategoryType {
  popular = "popular",
  now_playing = "now_playing",
  top_rated = "top_rated",
}

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Genres;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Data {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  title: string;
  known_for_department: string;
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
  vote_average: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}
