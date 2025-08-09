import React from "react";

import type { Cinema, Room } from "../../types/type";
import type { Seat } from "../../config/filterSeat";


export const SeatM = React.memo(
  ({
    rowSeats,
    seat,
    selected,
    vipRow,
    currentRoom,
    decodedTitle,
    handleClick,
    seatDates,
    currentTheater,
    ids
  }: {
    rowSeats:any[];
    seat: Seat[];
    selected: string[];
    vipRow: string[];
    currentRoom: Room | undefined;
    decodedTitle: string;
    ids: string|undefined;
    seatDates: (string|undefined)[];
    currentTheater: Cinema | undefined;

    handleClick: (
      id:string,
      isOrdered:string,
      date:string,
      room:string,
      price:number,
      title:string,
      quantity:number,
      location:string,
      city:string)=>void})=>{
    return (
      <div className="grid grid-cols-10 gap-2">
        {rowSeats.map((item, index) => {
          const seatSet = new Set(
            seat.map((item) => `${item.id}${item.roomId}${item.movieTitle}`)
          );
          const isSelected =
            selected.includes(item.id) &&
            seatSet.has(`${item.id}${currentRoom?.id}${decodedTitle}`);

          const isOrdered = item.isSelected;
          const isVip = vipRow.includes(item.id.charAt(0));
          let baseColor = "bg-green-500";
          if (isOrdered=="true") baseColor = "bg-red-600";
          if (item.isSelected == "true") baseColor = "bg-red-600";
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
                            handleClick(
                              item.id,
                              item.isSelected,
                              seatDates.slice(1, seatDates?.length).toString(),
                              currentRoom?.name || ids || "",
                              item.price,
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
