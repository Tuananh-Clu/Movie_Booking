import { useNavigate, useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useContext, useState } from "react";
import { SeatsContext } from "../config/filterSeat";

import { useEffect } from "react";
import type { TheaterType } from "../types/type";
import axios from "axios";

export const InfoTheater = () => {
  const { id } = useParams();
  const [TheaterData, setTheaterData] = useState<TheaterType[]>([]);
 const navigate = useNavigate();
  const { setSeat } = useContext(SeatsContext);
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get<TheaterType[]>(`https://backendformoviebooking-production.up.railway.app/api/Cinema/GetTheaterById?id=${id}`);
        setTheaterData(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };

    fetchCinemas();
  }, [id]);

  const Theater = TheaterData.filter((item) => item.id === id);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="w-full min-h-screen bg-gray-700 bg-center mb-40 flex  pt-40 px-20 object-cover">
        {Theater.map((item, index) => (
          <div className="flex flex-col gap-8 w-full" key={index}>
            {/* Thông tin rạp */}
            <div className="text-white flex md:flex-row flex-col gap-5 bg-black/50 p-6 rounded-2xl shadow-lg">
              <img
                className="rounded-2xl md:w-1/3 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="flex flex-col gap-3 justify-center">
                <h1 className="text-4xl font-bold">{item.name}</h1>
                <p>📍 Địa chỉ: {item.address}</p>
                <p>🏢 Hệ thống: {item.brand}</p>
                <p>📞 Liên hệ: {item.phone}</p>
              </div>
            </div>

            {/* Lịch chiếu */}
            <div className="text-white bg-black/80 p-6 mb-10 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-semibold mb-6">🎬 Lịch Chiếu</h2>
              {item.rooms?.length > 0 ? (
                <div className="space-y-6 max-h-[500px] hide-scrollbar overflow-y-auto pr-2">
                  {item.rooms.map((room, roomIndex) => (
                    <div
                      key={roomIndex}
                      className="border-b border-gray-700 pb-6"
                    >
                      <h3 className="text-xl font-bold text-amber-400 mb-2">
                        {room.name}
                      </h3>

                      {room.showtimes.map((show, showIndex) => (
                        <div
                          key={showIndex}
                          className="flex gap-5 mb-6 bg-gray-900/50 p-4 rounded-xl shadow"
                        >
                          <img
                            src={show.movie.poster}
                            alt={show.movie.title}
                            className="w-24 h-36 object-cover rounded-lg"
                          />
                          <div className="flex flex-col justify-between">
                            <div>
                              <h4 className="text-2xl font-semibold">
                                {show.movie.title}
                              </h4>
                              <h1>Thời Lượng:{show.movie.duration}p</h1>
                              <p className="text-sm text-gray-300 mb-2">
                                📅 {show.date}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {show.times.map((time, timeIdx) => (
                                <button
                                  onClick={() => {
                                    const regularRows = ["A", "B", "C", "D"];
                                    const seatType =
                                      Array.isArray(show.seats) &&
                                      show.seats.some((seat) =>
                                        regularRows.includes(seat.id.charAt(0))
                                      )
                                        ? "Regular"
                                        : "VIP";

                                    setSeat([
                                      {
                                        date: show.date,
                                        id: "",
                                        time: time,
                                        movieTitle: show.movie.title,
                                        isSelected: "true",
                                        price: 0,
                                        quantity: 0,
                                        image: show.movie.poster,
                                        seatType: seatType,
                                        Location: item.address,
                                        city: item.city,
                                      },
                                    ]);
                                    const title = encodeURIComponent(
                                      show.movie.title
                                    );
                                    navigate(
                                      `/Theater/${room.id}/${encodeURIComponent(
                                        title
                                      )}`
                                    );
                                  }}
                                  key={timeIdx}
                                  className="bg-amber-400 cursor-pointer text-black px-4 py-1 rounded-lg font-medium hover:bg-amber-300 transition"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">Chưa có lịch chiếu.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
