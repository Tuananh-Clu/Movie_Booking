import React from "react";
import type { infoTheater } from "../../types/type";
import type { Seat } from "../../config/filterSeat";

export const SeatM = React.memo(
  ({
    rowSeats,
    seat,
    selected,
    vipRow,
    currentRoom,
    decodedTitle,
    ids,
    seatDates,
    currentTheater,
    handleClick
  }: {
    rowSeats: any[];
    seat: Seat[];
    selected: string[];
    vipRow: string[];
    currentRoom?: string;
    decodedTitle: string;
    ids?: string;
    seatDates: (string | undefined)[];
    currentTheater?: infoTheater;
    handleClick: (
      id: string,
      name:string,
      isOrdered: string,
      date: string,
      room: string,
      price: number,
      title: string,
      quantity: number,
      location: string,
      city: string
    ) => void;
  }) => {
    const seatSet = new Set(seat.map(s => `${s.id}${s.roomId}${s.movieTitle}`));

    return (
      <div className="grid grid-cols-10 gap-2">
        {rowSeats.map((item, index) => {
          const isSelectedNow =
            selected.includes(item.id) &&
            seatSet.has(`${item.id}${currentRoom}${decodedTitle}`);
          const isVip = vipRow.includes(item.id.charAt(0));

          let baseColor = "bg-green-500"; 
          if (item.isOrdered == "true") {
            baseColor = "bg-red-600";
          } else if (isSelectedNow) {
            baseColor = "bg-yellow-400";
          } else if (
            seatSet.has(`${item.id}${currentRoom}${decodedTitle}`)
          ) {
            baseColor = "bg-yellow-400";
          }

          return (
            <div key={item.id} className="flex items-center">
              <div
                onClick={() =>
                  handleClick(
                    item.id,
                    currentTheater?.theatername??"",
                    item.isOrdered || item.isSelected || "false",
                    seatDates[1] ?? "",
                    currentRoom || ids || "",
                    item.price,
                    decodedTitle,
                    selected.length + 1,
                    currentTheater?.theateraddress || "",
                    currentTheater?.city || ""
                  )
                }
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center 
                  cursor-pointer transition-all duration-200 ease-in-out shadow-md 
                  text-sm md:text-base font-semibold text-black
                  hover:scale-110 ${baseColor} 
                  ${isVip ? "ring-2 ring-[--color-brand-pink]" : "ring-1 ring-white/20"}`}
                title={item.id}
              >
                {item.id.slice(1)}
              </div>

              {/* Lối đi giữa ghế 5 và 6 */}
              {(index + 1) % 5 === 0 && index + 1 !== rowSeats.length && (
                <div className="w-4" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);