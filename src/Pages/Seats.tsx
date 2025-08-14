import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { SeatsContext } from "../config/filterSeat";
import { TotalPrice } from "../components/SeatsComponents/TotalPrice";
import axios from "axios";
import { type SeatProp, type infoTheater } from "../types/type";
import { SeatM } from "../components/SeatsComponents/SeatM";

export const Seats = () => {
  const { room, title } = useParams();
  const decodedTitle = title ? decodeURIComponent(title) : "";

  const { seat, setSeat } = useContext(SeatsContext);
  const [selected, setSelected] = useState<string[]>([]);
  const [cinema, setCinema] = useState<infoTheater[]>([]);
  const [seats, setSeats] = useState<SeatProp[]>([]);

  const vipRow = ["D", "E", "F"];
  const regularRow = ["A", "B", "C", "D", "E", "F"];



  const seatDates = useMemo(() => 
    seat?.map((item) => item.date), [seat]
  );

  useEffect(() => {
    const fetchSeat = async () => {
      try {
        const { data } = await axios.get(
          `https://backendformoviebooking-production.up.railway.app/api/Cinema/GetSeat?movieid=${decodedTitle}&roomid=${room}&ngay=${seat[0].date}&time=${seat[0].time}`
        );
        setSeats(data);
      } catch (error) {
        console.error("Lỗi khi fetch ghế:", error);
      }
    };

    fetchSeat();
  }, );
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const { data } = await axios.get(
          `https://backendformoviebooking-production.up.railway.app/api/Cinema/LayThongTinRap?location=${seat[0].Location}&room=${room}&title=${decodedTitle}`
        );
        setCinema(data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };
    fetchCinemas();
  }, []);




  const toggleSeat = useCallback(
    (
      id: string,
      isOrdered: string,
      date: string,
      roomId: string,
      price: number,
      movieTitle: string,
      quantity: number,
      location: string,
      city: string
    ) => {
      if (isOrdered === "true") return;

      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );

      setSeat((prev) => {
        const exists = prev.some((item) => item.id === id);
        if (exists) {
          return prev.filter((item) => item.id !== id);
        }

        return [
          ...prev,
          {
            isSelected: isOrdered,
            id,
            movieTitle,
            time: date,
            roomId,
            price,
            quantity,
            image: cinema[0]?.poster || "",
            seatType: vipRow.includes(id.charAt(0)) ? "VIP" : "Regular",
            Location: location,
            city,
          },
        ];
      });
    },
    [setSeat, vipRow]
  );

  // Nhóm ghế theo hàng
  const seatRows = useMemo(() => {
    return regularRow
      .map((rowLabel) => ({
        rowLabel,
        rowSeats: seats.filter((s) => s.id.startsWith(rowLabel)),
      }))
      .filter(({ rowSeats }) => rowSeats.length > 0);
  }, [regularRow, seats]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />
      <div className="pt-28 px-4 md:px-16 flex flex-col items-center space-y-10">
        {/* Thông tin phim */}
        <section className="flex flex-col md:flex-row items-center gap-6 bg-neutral-900 p-6 rounded-2xl shadow-md w-full max-w-4xl">
          <img className="w-40 rounded-xl shadow" src={cinema[0]?.poster || ""} alt="" />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-amber-400">
              {decodedTitle}
            </h1>
            {seat.length > 0 && (
              <p className="text-gray-400">
                📅 {seatDates} | ⏰ {seat[0].time}
              </p>
            )}
              <div className="text-sm text-gray-400 space-y-1">
                <p>🏢 Rạp: {cinema[0]?.theatername || ""}</p>
                <p>🏠 Phòng: {seat[0]?.roomId || ""}</p>
                <p>📍 Địa chỉ: {cinema[0]?.theateraddress || ""}</p>
              </div>

          </div>
        </section>

        {/* Màn hình */}
        <div className="bg-gray-300 text-black font-bold text-center w-full md:w-1/2 mx-auto py-3 rounded-2xl shadow-inner">
          MÀN HÌNH
        </div>

        {/* Ghế */}
        <div className="w-full flex flex-col items-center gap-5 max-w-5xl">
          {seatRows.map(({ rowLabel, rowSeats }) => (
            <div
              key={rowLabel}
              className="flex items-center gap-4 w-full justify-center"
            >
              <span className="w-6 text-gray-400 font-semibold">
                {rowLabel}
              </span>
              <SeatM
                rowSeats={rowSeats}
                seat={seat}
                selected={selected}
                vipRow={vipRow}
                currentRoom={room}
                decodedTitle={decodedTitle}
                seatDates={seatDates}
                currentTheater={cinema[0]}
                handleClick={toggleSeat}
                ids={seats[0]?.id || ""}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-sm mt-8 flex-wrap bg-neutral-800 p-4 rounded-xl">
          <Legend color="bg-green-500" label="Còn trống" />
          <Legend color="bg-yellow-400" label="Đang chọn" />
          <Legend color="bg-red-600" label="Đã đặt" />
        </div>
      </div>

      {/* Total price */}
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
