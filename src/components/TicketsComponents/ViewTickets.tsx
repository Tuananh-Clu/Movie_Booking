import type React from "react";
import type { Seat } from "../../config/filterSeat";

type ViewTicketsProps = {
  ticket: Seat;
  time: string[];
  rows: () => string;
  seats: () => string;
  theater: () => string;
  setState: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ViewTickets = ({
  ticket,
  time,
  rows,
  seats,
  theater,
  setState,
}: ViewTicketsProps) => {
  return (
    <>
      <div className=" hidden md:block">
        <div className="fixed  inset-0 z-100 flex flex-col  gap-10 items-center justify-center bg-black/70">
          <div className="flex md:w-[800px] md:h-[300px] w-[350px] h-[200px]  bg-white text-black shadow-lg rounded-lg overflow-hidden">
            {/* Left Ticket */}
            <div className="  w-1/3 bg-white border-r border-dashed border-black flex items-center justify-center">
              <div className="flex flex-col items-start  rotate-[-90deg] w-[200px]">
                <h1 className="text-[10px] tracking-widest uppercase text-gray-500">
                  Premiere Movie Ticket
                </h1>
                <h1 className="text-3xl  font-serif font-bold text-red-600 my-2">
                  AP CINEMA
                </h1>

                <div className="flex flex-row w-full justify-between items-center my-4">
                  <h1 className="font-sans text-sm text-black tracking-wide">
                    THEATER: {theater()}
                  </h1>
                  <h1 className="text-xs font-bold bg-red-500 px-3 py-1 rounded">
                    {ticket.seatType === "Regular" ? "Regular" : "VVIP"}
                  </h1>
                </div>

                <ul className="text-[10px] flex flex-row gap-2 text-center items-center">
                  <li>ROW: {rows()}</li>
                  <div className="w-[1px] bg-red-500 h-4"></div>
                  <li>SEAT: {seats()}</li>
                  <div className="w-[1px] bg-red-500 h-4"></div>
                  <li>TIME: {time[0]}</li>
                </ul>
              </div>
            </div>

            {/* Right Ticket */}
            <div
              className="flex-1 text-white flex flex-col justify-between p-6 bg-cover bg-center"
              style={{ backgroundImage: `url(${ticket.image})` }}
            >
              <div className=" p-4 rounded">
                <h1 className="text-xs tracking-widest text-gray-400">
                  PREMIERE MOVIE TICKET
                </h1>
                <h1 className="text-3xl  font-serif font-bold leading-tight">
                  {ticket.movieTitle}
                </h1>
              </div>

              <div className="flex justify-between items-center  text-xs mt-4  p-4 rounded">
                <ul className="flex flex-row gap-3 text-center items-center">
                  <li>ROW: {rows()}</li>
                  <div className="w-[1px] bg-red-500 h-4"></div>
                  <li>SEAT: {seats()}</li>
                  <div className="w-[1px] bg-red-500 h-4"></div>
                  <li>TIME: {time}</li>
                </ul>

                <h1 className="text-lg font-bold">THEATER {theater()}</h1>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setState(() => null);
            }}
            className="bg-red-500 rounded-2xl p-3"
          >
            Đóng
          </button>
        </div>
      </div>
      <div className=" block md:hidden">
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm bg-white text-black shadow-lg rounded-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 border-b border-dashed border-black text-center">
              <h1 className="text-[10px] tracking-widest uppercase text-gray-500">
                Premiere Movie Ticket
              </h1>
              <h1 className="text-3xl font-serif font-bold text-red-600 my-1">
                AP CINEMA
              </h1>
            </div>

            {/* Main Info */}
            <div className="flex flex-col gap-3 p-4 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span>🎬 Movie:</span>
                <span>{ticket.movieTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🎞️ Theater:</span>
                <span>{theater()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🪑 Seat:</span>
                <span>
                  Row {rows()} - Seat {seats()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>🕒 Time:</span>
                <span>{time[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>💺 Type:</span>
                <span>{ticket.seatType}</span>
              </div>
            </div>

            {/* Poster Image */}
            <div
              className="h-50 bg-cover  bg-center rounded mx-4 mb-4"
              style={{ backgroundImage: `url(${ticket.image})` }}
            ></div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setState(null)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-2xl text-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </>
  );
};
