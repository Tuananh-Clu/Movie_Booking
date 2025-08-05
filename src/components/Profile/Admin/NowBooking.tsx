import axios from "axios";
import { useEffect, useState } from "react";
import type { Movies } from "../../../types/type";

export const NowBooking = () => {
  const [dataMovie, setDataMovie] = useState<Movies[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-1.onrender.com/api/Cinema/MovieBooking"
      );
      setDataMovie(response.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu phim:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-10 px-4 md:px-10">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">
        🎬 Danh Sách Phim Đang Chiếu
      </h1>

      <div className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 hide-scrollbar scrollbar-track-gray-900 p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {dataMovie?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 hover:bg-gray-800 transition-all duration-300 rounded-xl overflow-hidden shadow-lg border border-gray-700"
            >
              <img
                src={item?.poster}
                alt={item?.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white font-semibold text-base md:text-lg line-clamp-2 h-[48px]">
                  {item?.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
