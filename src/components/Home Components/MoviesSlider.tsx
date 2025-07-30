
import React, { useEffect, useRef } from "react";
import type { MovieApi } from "../../types/type";
import { MovieCard } from "./MovieCard";
type Slider={
    title:string,
    movies:MovieApi[]
}

export const MoviesSlider:React.FC<Slider> = ({title,movies}) => {
    useEffect(() => {
    console.log("Movies now playing:", title);
  }, [title]);
  const slider = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!slider.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = slider.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        slider.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.current.scrollBy({ left: 400, behavior: "smooth" });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="md:px-20 px-10 mt-10">
            <h1 className="text-2xl font-bold mb-4 "> {title==="Phim Đang Chiếu Tại Rạp"?"🎬":<i className="fa-solid fa-clock"></i>}{" "}{title}</h1>
            <div className="flex flex-row items-center gap-2  ">
             
              <div ref={slider} className="overflow-hidden rounded-2xl slider:hover ">
                <div className={`flex flex-row gap-3 w-max `}>
                  {movies?.map((item) => (
                    <MovieCard
                      key={item.id}
                      id={item.id}
                      poster_pathh={item.poster_path}
                      original_tittle={item.original_title}
                      size={title==="Phim Đang Chiếu Tại Rạp"?550:200}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
  )
}
