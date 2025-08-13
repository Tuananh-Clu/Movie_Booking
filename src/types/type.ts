import type { Store } from "../config/filterSeat";

export interface MovieApi {
  adult: boolean;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  genre_ids: number[];
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  type: Choice[];
  video:boolean;
  vote_count: number;
}
export interface MovieCards {
  id: number;
  poster_pathh: string;
  original_tittle: string;
  size: number;
}
type Choice = "now_playing" | "upcomming" | "popular";

export interface Actor {
  adult:string;
  name:string;
  profile_path:string;
  character:string;
}
export interface ActorApi {
  id: string;
  cast: Actor[];
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
  role:string
tickets:Store[][],
yeuThich:Movies[]
}
// types.ts
export interface SeatProp {
  id: string;
  isOrdered:string;
  price:number;
  type:string;
}

export interface Movie {
  title: string;
  poster: string;
}

export interface Showtime {
  date: string;
  times: string[];
  movie: Movies;
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
export interface Movies{
  id:string
  title: string;
  poster: string;
  duration:number;
}
export type TheaterType = {
  id: string;
  name: string;
  address: string;
  image: string;
  rooms:Room[]
  brand: string;
  phone: string;
  city: string;
};

export type dateSelect = {
  date: string;
  cinemaName: string;
  cinemaId: string;
  time: string[];
  roomName: string;
  roomId: string;
  location: string;
  movieTitle: string;
  poster: string;
};
export type infoTheater={
  theatername:string,
  theateraddress:string,
  poster:string,
  city:string,

}
export type TheaterFullTypeFill = {
  id: string;
  name: string;
  address: string;
  image: string;
  city:string
}
export type BookingType={
  name:string,
  rooms:Room[]
}
export type genres={
  id: number;
  name: string;
}
export type doanhthu = {
  name:string
  quantity: number;
  totalPrice: number;
  avune:number[];
}

