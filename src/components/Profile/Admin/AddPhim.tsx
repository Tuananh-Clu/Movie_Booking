import axios from "axios";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { type MovieApi, type Movies, type SeatProp } from "../../../types/type";
import { FilterContext } from "../../../config/FilterTheater";
import seat from "../../../assets/Seat.json";
import { BookingContext } from "../../../config/BookingContext";

export const AddPhim = () => {
  const { allCinemas } = useContext(FilterContext);
  const {bookingData, setBookingData } = useContext(BookingContext);
  const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
  const [selectValue, setSelectValue] = useState<string>("CGV Vincom Bà Triệu");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [timeLine, setTimeLine] = useState<string[]>([]);
  const [day, setDay] = useState<string>("");
  const [movies, setMovie] = useState<Movies>();
  const [seatNum, setSeatNum] = useState<number>(0);

  const slider = useRef<HTMLDivElement>(null);
  const IMG_PATH = "https://image.tmdb.org/t/p/original";

  const selectedCinema = useMemo(
    () => allCinemas.find((cinema) => cinema.name === selectValue),
    [selectValue, allCinemas]
  );

  const slicedSeats = useMemo<SeatProp[]>(() => {
    return seat.slice(0, seatNum);
  }, [seatNum]);
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

  const handleSubmit =async(e: React.FormEvent) => {
    e.preventDefault();
    if (!movies) {
      alert("Bạn chưa chọn phim.");
      return;
    }
    if (!day || timeLine.length === 0 || slicedSeats.length === 0) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setBookingData({
      date: day,
      seats: slicedSeats,
      time: timeLine,
      movie: movies,
    });

    alert("🎉 Tạo lịch chiếu thành công!");

   
  };
  useEffect(()=>{
    const upload=async()=>{
     try {
      const url = `https://backendformoviebooking-1.onrender.com/api/Cinema/AddShowTime?cinemaName=${encodeURIComponent(
        selectValue
      )}&roomId=${selectedRoom}`;
      await axios.post(url, bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Gửi lỗi Error", error);
    }
  }
  upload()
  },[bookingData])

  return (
    <div className="text-white w-full px-4">
      <h1 className="text-2xl font-bold mb-6">🎥 Phim Đang Chiếu</h1>

      {/* Movie Slider */}
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
                  onClick={async () => {
                    try {
                      const detail = await axios.get(
                        `https://api.themoviedb.org/3/movie/${item.id}?api_key=f0ab50cc5acff8fa95bb6bda373e8aa9&language=vi-VN`
                      );

                      setMovie({
                        id: String(item.id),
                        title: item.original_title,
                        poster: item.poster_path,
                        duration: detail.data.runtime || 0,
                      });
                    } catch (err) {
                      console.error("Lỗi khi lấy runtime:", err);
                    }
                  }}
                  loading="lazy"
                  className="w-full h-60 object-cover rounded-t-xl cursor-pointer"
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-800 p-6 rounded-2xl"
      >
        {/* Left */}
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

          <div>
            <label className="block font-medium mb-1">💺 Số ghế</label>
            <input
              type="number"
              min={1}
              max={seat.length}
              placeholder="VD: 60"
              value={seatNum}
              onChange={(e) => setSeatNum(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-black text-white outline-none"
            />
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">📅 Ngày chiếu</label>
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-700 text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">⏰ Suất chiếu</label>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="VD: 19:00"
                className="w-full p-3 rounded-xl bg-black text-white outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (time.length >= 4) {
                    setTimeLine((prev) => [...prev, time]);
                    setTime("");
                  }
                }}
                className="bg-white text-black p-3 rounded-xl"
              >
                Set
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {timeLine.map((ite, index) => (
              <span
                key={index}
                onClick={() =>
                  setTimeLine((prev) => prev.filter((_, i) => i !== index))
                }
                className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold cursor-pointer hover:bg-red-400 transition"
                title="Bấm để xoá"
              >
                {ite}
              </span>
            ))}
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
