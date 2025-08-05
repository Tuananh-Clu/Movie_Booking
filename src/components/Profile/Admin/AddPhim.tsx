import axios from "axios";
import { useEffect, useState } from "react";
import { type MovieApi } from "../../../types/type";

export const AddPhim = () => {
  const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/MovieNowPlaying/Show"
        );
        setMoviesPlaying(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">🎥 Phim Đang Chiếu</h1>
      <div className="flex gap-6 overflow-x-hidden hide-scrollbar max-w-[600px] pb-4 pr-2">
        {moviesPlaying.map((item, index) => (
          <div
            key={index}
            className="min-w-[180px] max-w-[180px] bg-gray-800 rounded-xl shadow-md hover:scale-105 transition"
          >
            <img
              className="w-full h-64 object-cover rounded-t-xl"
              src={IMG_PATH + item.backdrop_path}
              alt={item.tittle}
            />
            <div className="p-3">
              <h2 className="text-sm font-semibold line-clamp-2">
                {item.tittle}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
