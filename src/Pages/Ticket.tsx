import {  useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import {  type Seat, } from "../config/filterSeat";
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
      const response = await axios(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetUser",
        {
        headers: {
            Authorization: `Bearer ${token} `,
          "Content-Type": "application/json",
        },
        }
      );
      setStoreDataBase(response.data);
    } catch (error) {
      console.log(error);
    }
  };
   const UpdateTicket = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const response= await axios.post(
        "https://backendformoviebooking-1.onrender.com/api/Cinema/Update",
        storeDataBase?.tickets.flat(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("succeessad");
      return response
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);
   useEffect(() => {
    UpdateTicket()
    console.log(storeDataBase);
  });
  return (
    <>
      <Navbar />
      <div className="bg-black text-white flex flex-col items-start min-h-screen md:px-20 px-10 py-6 pt-40">
        <h1 className="text-3xl font-bold mb-6">🎟️ Vé Xem Phim</h1>

        {storeDataBase?.tickets.length === 0 ? (
          <p className="text-gray-400">Không có vé nào được lưu.</p>
        ) : (
          storeDataBase?.tickets.map((ticketGroup: Seat[], index) => {
            const ticket = ticketGroup[1];
            const timess: string[] = ticketGroup.slice(1,2)
                .map((item) => item.date)
                .filter((d): d is string => typeof d === "string");
            const date = ticketGroup
              .slice(1, 2)
              .map((item) => item.time);
            const rows = ticketGroup.map((item) => item.id.charAt(0)).join(" ");
            const seats = ticketGroup.map((item) => item.id).join(" ");
              const theater = ticket?.roomId?.charAt(6);

              return (
              <div
                key={index}
                className="bg-gray-800 w-full max-w-8xl rounded-2xl shadow-xl flex md:flex-row items-center flex-col gap-6 p-6 mb-6 relative"
              >
                {activePopupIndex === index && (
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
                      {timess} {date}
                      </span>
                    </p>
                    <p>
                    📍 {ticketGroup[1]?.Location}
                    </p>
                  <p>🎬 Phòng: {ticketGroup[1].roomId}</p>
                    <p>
                      💺 Ghế đã đặt:{" "}
                    <span className="font-medium">
                      {ticketGroup.map((item) => item.id).join(" ")}
                    </span>
                    </p>
                    <p>
                      💰 Tổng tiền:{" "}
                      <span className="font-semibold">
                      {ticketGroup.slice(1,ticketGroup.length)
                        .reduce(
                          (sum, item) => sum + item.price ,
                          0
                        )
                          .toLocaleString("vi-VN")}
                        đ
                      </span>
                    </p>
                    <button
                      onClick={() =>
                      setActivePopupIndex((prev) =>
                        prev === index ? null : index
                      )
                      }
                      className="bg-red-500 rounded-2xl p-3"
                    >
                      Chi Tiết
                    </button>
                  </div>
          </div>
            );
          })
        )}
      </div>
    </>
  );
};
