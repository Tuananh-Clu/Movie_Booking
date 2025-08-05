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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // ✅ CHỈ GỌI LẦN ĐẦU

  return (
    <div className="mt-10 px-6">
      <h1 className="text-white text-3xl font-bold mb-6">🎬 Phim Đang Chiếu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {dataMovie?.map((item, index) => (
          <div
            className="bg-gray-800 hover:bg-gray-700 transition rounded-xl overflow-hidden shadow-md"
            key={index}
          >
            <img
              className="w-full h-64 object-cover"
              src={item?.poster}
              alt={item?.title}
            />
            <div className="p-4">
              <h2 className="text-white font-semibold text-lg line-clamp-2">{item?.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
