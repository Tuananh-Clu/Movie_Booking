import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { SeatsContext } from "../config/filterSeat";
import { TotalPrice } from "../components/SeatsComponents/TotalPrice";
import axios from "axios";
import type { Cinema } from "../types/type";

export const Seats = () => {
  const { room, title } = useParams();
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const { seat, setSeat } = useContext(SeatsContext);
  const [selected, setSelected] = useState<string[]>([]);
  const [cinema, setCinema] = useState<Cinema[]>([]);

  const vipRow = ["D", "E", "F"];
  const regularRow = ["A", "B", "C", "D", "E", "F"];
  const seatDates = seat?.map((item) => item.date);

  const currentTheater = cinema.find((theater) =>
    theater.rooms.some((r) => r.id === room)
  );

  const currentRoom = currentTheater?.rooms.find((r) => r.id === room);
  const currentShowtime = currentRoom?.showtimes.find(
    (showtime) => showtime.movie.title === decodedTitle
  );

  const Poster = currentShowtime?.movie.poster;

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("https://backendformoviebooking-1.onrender.com/api/Cinema");
        setCinema(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };
    fetchCinemas();
  }, []);


  const ids = currentRoom?.id.toString();
  const toggleSeat = (
    id: string,
    isOrdered: boolean,
    date: string,
    room: string,
    price: number,
    title: string,
    quantity: number,
    location: string,
    city: string
  ) => {
    if (isOrdered) return;
    setSelected((prev) => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        setSeat((prev) => prev.filter((item) => item.id !== id));
      } else {
        return [...prev, id];
      }
      return isSelected ? prev.filter((item) => item !== id) : [...prev, id];
    });
    setSeat((prev) => {
      const exists = prev.some((item) => item.id === id);
      if (!exists) {
        return [
          ...prev,
          {
            isSelected: isOrdered,
            id: id,
            movieTitle: title,
            time: date,
            roomId: room,
            price: price,
            quantity: quantity,
            image: Poster,
            seatType: vipRow.includes(id.charAt(0)) ? "VIP" : "Regular",
            Location: location,
            city: city,
          },
        ];
      }
      return prev.filter((item) => item.id !== id);
    });
    console.log("Selected seats:", selected);
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />
      <div className="pt-28 px-4 md:px-16 flex flex-col items-center space-y-10">
        <section className="flex flex-col md:flex-row items-center gap-6 bg-neutral-900 p-6 rounded-2xl shadow-md w-full max-w-4xl">
          <img
            className="w-40 rounded-xl shadow"
            src={Poster}
            alt=""
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-amber-400">
              {decodedTitle}
            </h1>
            {seat.length > 0 && (
              <p className="text-gray-400">
                📅 {seatDates} | ⏰ {seat[0].time}
              </p>
            )}
            {currentTheater && currentRoom && (
              <div className="text-sm text-gray-400 space-y-1">
                <p>🏢 Rạp: {currentTheater.name}</p>
                <p>🏠 Phòng: {currentRoom.name}</p>
                <p>📍 Địa chỉ: {currentTheater.address}</p>
              </div>
            )}
          </div>
        </section>

        <div className="bg-gray-300 text-black font-bold text-center w-full md:w-1/2 mx-auto py-3 rounded-2xl shadow-inner">
          MÀN HÌNH
        </div>

        <div className="w-full flex flex-col items-center gap-5 max-w-5xl">
          {regularRow.map((rowLabel) => {
            const rowSeats = currentShowtime?.seats.filter((s) => s.id.startsWith(rowLabel));
            if (!rowSeats || rowSeats.length === 0) return null;

            return (
              <div
                key={rowLabel}
                className="flex items-center gap-4 w-full justify-center"
              >
                <span className="w-6 text-gray-400 font-semibold">
                  {rowLabel}
                </span>
                <div className="grid grid-cols-10 gap-2">
                  {rowSeats.map((item, index) => {
                    const isSelected =
                      selected.includes(item.id) &&
                      seat.some(
                        (i) =>
                          i.id === item.id &&
                          i.roomId === currentRoom?.name &&
                          i.movieTitle === decodedTitle
                      );

                    const isOrdered = item.isOrdered;
                    const isVip = vipRow.includes(item.id.charAt(0));
                    let baseColor = "bg-green-500";
                    if (isOrdered) baseColor = "bg-red-600";
                    if(item.isOrdered==true) baseColor = "bg-red-600";
                    else if (isSelected) baseColor = "bg-yellow-400";
                    else if (
                      seat.some(
                        (i) =>
                          i.id === item.id &&
                          i.roomId === currentRoom?.name &&
                          i.movieTitle === decodedTitle
                      )
                    ) {
                      baseColor = "bg-yellow-400";
                    }

                    return (
                      <div key={item.id} className="flex items-center">
                        <div
                          onClick={() =>
                            toggleSeat(
                              item.id,
                              item.isOrdered==true,
                              seatDates.slice(1, seatDates.length).toString(),
                              currentRoom?.name || ids || "",
                              isVip ? 100000 : 75000,
                              decodedTitle,
                              selected.length + 1,
                              currentTheater?.address || "",
                              currentTheater?.city || ""
                            )
                          }
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center 
                            cursor-pointer transition-all duration-200 ease-in-out shadow-md 
                            text-sm md:text-base font-semibold text-black
                            hover:scale-110 ${baseColor} 
                            ${
                              isVip
                                ? "border-2 border-yellow-300"
                                : "border border-gray-500"
                            }`}
                          title={item.id}
                        >
                          {item.id.slice(1)}
                        </div>

                        {/* Lối đi giữa ghế 5 và 6 */}
                        {(index + 1) % 5 === 0 &&
                          index + 1 !== rowSeats.length && (
                            <div className="w-4" />
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 text-sm mt-8 flex-wrap bg-neutral-800 p-4 rounded-xl">
          <Legend color="bg-green-500" label="Còn trống" />
          <Legend color="bg-yellow-400" label="Đang chọn" />
          <Legend color="bg-red-600" label="Đã đặt" />
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-neutral-900 p-4 shadow-lg z-50">
        <TotalPrice />
      </div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded ${color}`}></div>
    <span>{label}</span>
  </div>
);
