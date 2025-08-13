import React from "react";
import type { MovieApi } from "../../types/type";

const IMG_PATH = "https://image.tmdb.org/t/p/original";

interface HeroSliderProps {
  movie: MovieApi[];
  onChange: (item: string, title: string, description: string,id:number) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ movie, onChange }) => {
  return (
    <div className="flex flex-row  gap-4">
      {movie?.slice(1, 6).map((item) => (
        <div
          onClick={() =>
            onChange(
              IMG_PATH + item.poster_path,
              item.overview,
              item.original_title,
              item.id
            )
          }
          className="w-[100px] cursor-pointer"
          key={item.id} // dùng id nếu có
        >
          <img
            className="rounded-2xl hover:border-2 hover:border-white"
            src={IMG_PATH + item.backdrop_path}
            alt={item.title || "movie image"}
          />
        </div>
      ))}
    </div>
  );
};
