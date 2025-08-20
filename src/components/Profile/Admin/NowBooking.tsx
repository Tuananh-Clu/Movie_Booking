import axios from "axios";
import { useEffect, useState } from "react";
import type { Movies } from "../../../types/type";

export const NowBooking = () => {
  const [dataMovie, setDataMovie] = useState<Movies[]>([]);
  const [dataMovies, setDataMovies] = useState<any[]>([]);
  const [popUp, setPopUp] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-production.up.railway.app/api/Cinema/MovieBooking"
      );
      setDataMovie(response.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu phim:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchInfo = async ({ title }: { title: string }) => {
    try {
      const response = await axios.get(
        `https://backendformoviebooking-production.up.railway.app/api/Cinema/GetShowTimeById?movieTitle=${encodeURIComponent(
          title
        )}`
      );
      setDataMovies(response.data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu phim:", error);
    }
    setPopUp(true);
  };
  const Delete = async ({ title,time,name }: { title: string,time:string,name:string }) => {
    try {
       await axios.delete(
        `https://backendformoviebooking-production.up.railway.app/api/Cinema/DeleteShowTime?movieId=${encodeURIComponent(
          title)}&movietheater=${encodeURIComponent(name)}&time=${encodeURIComponent(time)}`
      );
    } catch (error) {
      console.error("Lỗi tải dữ liệu phim:", error);
    }
  };

  return (
    <>
      <div className="mt-10 px-4 md:px-10">
        <h1 className="text-white text-2xl font-bold mb-8 text-center">
          🎬 Danh Sách Phim Đang Chiếu
        </h1>
        <h1 className="text-white text-xs font-bold mb-4 text-center">
          Click Để Hiện Suất Chiếu Của Từng Rạp
        </h1>

        <div className="max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 hide-scrollbar scrollbar-track-gray-900 p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {dataMovie?.map((item, index) => (
              <div
                key={index}
                className="transition-all duration-300 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-white/5 hover:bg-white/10"
              >
                <img
                  onClick={() => fetchInfo({ title: item?.title })}
                  src={item?.poster}
                  alt={item?.title}
                  className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
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
      <div>
        {popUp && (
          <div className="fixed inset-0 w-full h-screen z-50 flex items-center justify-center bg-black/70 animate-fadeIn">
            <div className="rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 transform transition-transform duration-300 scale-100 text-white bg-white/5 backdrop-blur ring-1 ring-white/10">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Thông Tin Lịch Chiếu
                </h2>
                <button
                  onClick={() => setPopUp(false)}
                  className="text-gray-300 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
                {dataMovies?.length > 0 ? (
                  dataMovies.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg p-3 transition-shadow duration-200 bg-white/5 ring-1 ring-white/10"
                    >
                      <h3 className="font-semibold">
                        {item?.name}
                      </h3>
                      {item?.times && item.times.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.times.map((time:string, idx:number) => (
                            <span
                              onClick={()=>Delete({title:item?.title,time:time,name:item?.name})}
                              key={idx}
                              className="text-sm cursor-pointer px-2 py-1 rounded-full bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] text-white hover:opacity-90"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300 text-center">
                    Chưa có lịch chiếu
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setPopUp(false)}
                  className="text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

