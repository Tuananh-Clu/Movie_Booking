import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { type Seat } from "../config/filterSeat";
import { ViewTickets } from "../components/TicketsComponents/ViewTickets";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import type { Database } from "../types/type";

export const Ticket = () => {
  const { getToken } = useAuth();
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
  const [storeDataBase, setStoreDataBase] = useState<Database>();

  const fetchData = async () => {
    try {
      const token = await getToken();
      const response = await axios("https://backendformoviebooking-1.onrender.com/api/Client/GetUser", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setStoreDataBase(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tickets = storeDataBase?.tickets.at(1); 

  return (
    <>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-start min-h-screen md:px-20 px-10 py-6 pt-40">
        <h1 className="text-3xl font-bold mb-6">🎟️ Vé Xem Phim</h1>

        {!tickets || tickets.length === 0 ? (
          <p className="text-gray-400">Không có vé nào được lưu.</p>
        ) : (
          <div className="bg-gray-800 w-full max-w-8xl rounded-2xl shadow-xl flex md:flex-row items-center flex-col gap-6 p-6 mb-6 relative">
            {(() => {
              const ticket = tickets[0];
              const timess: string[] = tickets
                .map((item) => item.date)
                .filter((d): d is string => typeof d === "string");
              const date = tickets
                .map((item) => item.time)
                .filter((d): d is string => typeof d === "string");
              const rows = tickets.map((item) => item.id.charAt(0)).join(" ");
              const seats = tickets.map((item) => item.id).join(" ");
              const theater = ticket?.roomId?.charAt(6);

              return (
                <>
                  {activePopupIndex === 1 && (
                    <ViewTickets
                      ticket={ticket}
                      time={timess}
                      rows={() => rows}
                      seats={() => seats}
                      theater={() => (theater ? theater : "not")}
                      setState={setActivePopupIndex}
                    />
                  )}

                  <div className="flex-shrink-0">
                    <img
                      src={ticket?.image}
                      alt={ticket?.movieTitle}
                      className="rounded-xl shadow-md w-60 h-auto object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">
                      {ticket?.movieTitle}
                    </h2>
                    <p>
                      📅{" "}
                      <span className="font-medium">
                        {timess.join(", ")} {date.join(", ")}
                      </span>
                    </p>
                    <p>
                      📍 {ticket.Location}, {ticket.city}
                    </p>
                    <p>🎬 Phòng: {ticket.roomId}</p>
                    <p>
                      💺 Ghế đã đặt:{" "}
                      <span className="font-medium">{seats}</span>
                    </p>
                    <p>
                      💰 Tổng tiền:{" "}
                      <span className="font-semibold">
                        {tickets
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString("vi-VN")}
                        đ
                      </span>
                    </p>
                    <button
                      onClick={() =>
                        setActivePopupIndex((prev) => (prev === 1 ? null : 1))
                      }
                      className="bg-red-500 rounded-2xl p-3"
                    >
                      Chi Tiết
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </>
  );
};
