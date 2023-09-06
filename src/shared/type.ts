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
  readonly poster_path: string | null;
  readonly backdrop_path: string | null;
  readonly adult: boolean;
  readonly overview: string;
  readonly release_date: string;
  readonly genres: Genre[];
  readonly id: number;
  readonly original_title: string;
  readonly original_language: string;
  readonly title: string;
  readonly runtime: number | undefined;
  readonly credits: Credits;
}

export interface Movies {
  readonly page: number;
  readonly total_results: number;
  readonly total_pages: number;
  readonly results: Movie[];
}

export interface People {
  readonly page: number;
  readonly total_results: number;
  readonly total_pages: number;
  readonly results: Cast[];
}

export interface Genre {
  readonly id: number;
  readonly name: string;
}

export interface Cast {
  readonly adult: boolean;
  readonly gender: number;
  readonly id: number;
  readonly title: string;
  readonly also_known_as: string[];
  readonly biography: string;
  readonly place_of_birth: string;
  readonly birthday: string;
  readonly name: string;
  readonly original_name: string;
  readonly popularity: number;
  readonly profile_path: string;
  readonly cast_id: number;
  readonly character: string;
  readonly credit_id: string;
  readonly order: number;
  readonly poster_path: string;
}

export interface Crew {
  readonly adult: boolean;
  readonly id: number;
  readonly name: string;
  readonly popularity: number;
  readonly profile_path: string;
  readonly credit_id: string;
  readonly job: string;
}

export interface Credits {
  readonly cast: Cast[];
  readonly crew: Crew[];
}

export interface SearchQueryArg {
  readonly query: string;
  readonly page: number;
}

export interface Genres {
  readonly genres: Genre[];
}
