import {  useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { type Seat } from "../config/filterSeat";
import { ViewTickets } from "../components/TicketsComponents/ViewTickets";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import type { Database } from "../types/type";
import { API_CONFIG, buildApiUrl } from "../config/api";


export const Ticket = () => {
  const { isSignedIn } = useAuth();
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
  const [storeDataBase, setStoreDataBase] = useState<Database>();

  const fetchData = async () => {
    if (!isSignedIn) return;
    
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) return;
      
      const response = await axios(
        buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_USER),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Token:", token);
      setStoreDataBase(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const UpdateTicket = async () => {
    if (!isSignedIn) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      console.log("Token:", token);
      console.log(storeDataBase?.tickets.flat())
      const response = await axios.post(
        buildApiUrl(API_CONFIG.BACKEND.CINEMA.UPDATE),
        storeDataBase?.tickets.flat(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(storeDataBase?.tickets.slice(1, storeDataBase.tickets.length).flat())
      console.log("succeessad");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [isSignedIn]); 
  useEffect(() => {
    if (storeDataBase?.tickets && storeDataBase.tickets.length > 0) {
      UpdateTicket();
    }
  }, [storeDataBase?.tickets]);
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
            const timess: string[] = ticketGroup
              .slice(1, 2)
              .map((item) => item.date)
              .filter((d): d is string => typeof d === "string");
            const date = ticketGroup.slice(1, 2).map((item) => item.time);
            const rows = ticketGroup.map((item) => item.id.charAt(0)).join(" ");
            const seats = ticketGroup.map((item) => item.id).join(" ");
            const theater = ticket?.roomId?.charAt(5);

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
                  <p>📍 {ticketGroup[1].Location}</p>
                  <p>🎬 Rạp: {ticketGroup[1].roomId?.slice(5,6)}-Phòng: {ticketGroup[1].roomId?.slice(7,8)}
                  </p>
                  <p>
                    💺 Ghế đã đặt:{" "}
                    <span className="font-medium">
                      {ticketGroup.map((item) => item.id).join(" ")}
                    </span>
                  </p>
                  <p>
                    💰 Tổng tiền:{" "}
                    <span className="font-semibold">
                      {ticketGroup.slice(0,1).map(item=>item.price)
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
