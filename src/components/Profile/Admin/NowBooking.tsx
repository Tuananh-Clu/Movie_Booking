import axios from "axios";
import { useEffect, useState } from "react";
import type { Movies } from "../../../types/type";

export const NowBooking = () => {
  const [dataMovie, setDataMovie] = useState<Movies[]>([]);
  const [dataMovies, setDataMovies] = useState<any[]>([]);
  const [popUp,setPopUp] = useState(false); 

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
   const fetchInfo = async ({title}:{title:string}) => {
    try {
      const response = await axios.get(
        `https://backendformoviebooking-production.up.railway.app/api/Cinema/GetShowTimeById?movieTitle=${encodeURIComponent(title)}`
      );
      setDataMovies(response.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu phim:", error);
    }
    setPopUp(true);
  };


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
                onClick={() => fetchInfo({ title: item?.title })}
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
      <div>
        {popUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold mb-4">Thông Tin Lịch Chiếu</h2>
              <div>
                {dataMovies?.map((item, index) => (
                  <div key={index} className="border-b border-gray-300 py-2">
                    <h3 className="font-semibold">{item?.name}</h3>
                    <p className="text-sm text-gray-600">{item?.times}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPopUp(false)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
