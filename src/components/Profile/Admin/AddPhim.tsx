import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { type MovieApi } from "../../../types/type";
import { FilterContext } from "../../../config/FilterTheater";

export const AddPhim = () => {
  const { allCinemas } = useContext(FilterContext);
  const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/original";
  const [selectValue, setSelectValue] = useState<string>("CGV Vincom Bà Triệu");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const slider = useRef<HTMLDivElement>(null);

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

  const handleClickRight = () => {
    if (slider.current) {
      slider.current.scrollLeft += 400;
      slider.current.style.scrollBehavior = "smooth";
    }
  };
  const handleClickLeft = () => {
    if (slider.current) {
      slider.current.scrollLeft -= 400;
      slider.current.style.scrollBehavior = "smooth";
    }
  };

  const selectedCinema = allCinemas.find(
    (cinema) => cinema.name === selectValue
  );

  return (
    <div className="text-white w-full px-4">
      <h1 className="text-2xl font-bold mb-6">🎥 Phim Đang Chiếu</h1>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={handleClickLeft} className="p-3 bg-black rounded-full">
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div
          ref={slider}
          className="flex gap-4 hide-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {moviesPlaying
            .filter((item) => item.backdrop_path)
            .map((item, index) => (
              <div
                key={index}
                className="min-w-[200px] snap-start bg-zinc-900 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
              >
                <img
                  loading="lazy"
                  className="w-full h-60 object-cover rounded-t-xl"
                  src={IMG_PATH + item.backdrop_path}
                  alt={item.tittle}
                />
                <div className="p-3 text-center">
                  <h2 className="text-base font-semibold line-clamp-2">
                    {item.original_title}
                  </h2>
                </div>
              </div>
            ))}
        </div>

        <button
          onClick={handleClickRight}
          className="p-3 bg-black rounded-full"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Form chọn lịch chiếu */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-800 p-6 rounded-2xl">
        {/* Cột 1: Rạp + Phòng */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">🎬 Rạp</label>
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="w-full p-3 rounded-xl bg-black text-white"
            >
              {allCinemas.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">🏢 Phòng</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full p-3 rounded-xl bg-black text-white"
            >
              <option value="">-- Chọn phòng --</option>
              {selectedCinema?.rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.id}
                </option>
              ))}
            </select>
          </div>
          <div></div>
        </div>

        {/* Cột 2: Ngày + Giờ */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">📅 Ngày chiếu</label>
            <input
              type="date"
              className="w-full p-3 rounded-xl bg-black text-white outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">⏰ Suất chiếu</label>
            <input
              type="text"
              placeholder="VD: 19:00"
              className="w-full p-3 rounded-xl bg-black text-white outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">💰 Giá vé</label>
            <input
              type="number"
              placeholder="VD: 75000"
              min={10000}
              className="w-full p-3 rounded-xl bg-black text-white outline-none"
            />
          </div>
        </div>

        {/* Nút tạo */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-all px-6 py-3 rounded-xl font-bold"
          >
            🎫 Tạo Lịch Chiếu
          </button>
        </div>
      </form>
    </div>
  );
};
