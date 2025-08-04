import type { Store } from "../config/filterSeat";

export interface MovieApi {
  id: number;
  original_title: string;
  overview: string;
  tittle: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  type: Choice[];
}
export interface MovieCards {
  id: number;
  poster_pathh: string;
  original_tittle: string;
  size: number;
}
type Choice = "now_playing" | "upcomming" | "popular";

export interface Actor {
  Name: string;
  Profile: string;
}
export type combos = {
  name: string;
  price: number;
  quantity: number;
};

export type items = {
  categories: string[];
  content: string;
  enclosure?: {
    link: string ;
    type: string ;
    length: number;
  };
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
};

export type feed = {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  url: string;
};

export interface articles{
  status: string;
  feed: feed;
  items: items[];
}

export interface Database{
  name:string,
  email:string,
tickets:Store[][]
}
// types.ts
export interface SeatProp {
  id: string;
  isOrdered: boolean;
}

export interface Movie {
  title: string;
  poster: string;
}

export interface Showtime {
  date: string;
  times: string[];
  movie: Movie;
  seats: SeatProp[];
}

export interface Room {
  id: string;
  name: string;
  showtimes: Showtime[];
}

export interface Cinema {
  name: string;
  address: string;
  city: string;
  rooms: Room[];
}
