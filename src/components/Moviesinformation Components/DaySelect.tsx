import type React from "react";
import List from "../../assets/asd_showtimes_rich_poster_fixed.json";
import { useNavigate } from "react-router";
import { useContext, useRef, useState } from "react";
import { SeatsContext } from "../../config/filterSeat";
import axios from "axios";
import { useEffect } from "react";

interface DaySelectProps {
  title?: string;
}

export const DaySelect: React.FC<DaySelectProps> = ({ title }) => {
  const [Day,SetDay]=useState<typeof List>([]);
   useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("https://backendformoviebooking-1.onrender.com/api/Cinema");
        SetDay(response.data)
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
 
      }
    };

    fetchCinemas();

  }, []);
    const Date = Day.flatMap(cinema =>
    cinema.rooms.flatMap(room =>
      room.showtimes
        .filter(showtime => showtime.movie.title === title)
        .map(showtime => ({
          id: cinema.id,
          date: showtime.date,
          movie: showtime.movie.title,
          cinema: cinema.name,
          room: room.id,
          times: showtime.times,
          poster: showtime.movie.poster,
          duration: showtime.movie.duration,  
          image:showtime.movie.poster,
          location:cinema.address,
          city:cinema.city
        }))
    )
  );
  const navigate = useNavigate();
  const slider=useRef(null as HTMLDivElement | null);
  const LeftClick=()=>{
    if(slider.current){
      slider.current.scrollBy({
        left: -250,
        behavior: "smooth"
      });
    }
  }
   const RightClick=()=>{
    if(slider.current){
      slider.current.scrollBy({
        left: 250,
        behavior: "smooth"
      });
      if(slider.current.scrollLeft+slider.current.clientWidth >= slider.current.scrollWidth){
        slider.current.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      }
    }
  }
   const vipRow = ["D", "E", "F"];
  const {setSeat}=useContext(SeatsContext);
  const handleClick=(movieTitle: string, time: string, date: string,id:string,image:string,location:string,city:string)=>{
    setSeat([
      {
        isSelected: "false",
        id: "",
        time: time,
        roomId: "",
        movieTitle: movieTitle,
        date: date,
        price: 0,
        quantity: 0,
        image: image,
        seatType:vipRow.includes(id.charAt(0)) ? "VIP" : "Regular",
        Location:location,
        city:city
      }
    ]);
    navigate(`/Theater/${id}/${encodeURIComponent(movieTitle)}`);
  }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-40 px-4">
      <h2 className="text-black text-2xl font-semibold mb-4">
        {Date.length > 0 ? "Lịch Chiếu Hiện Có" : "Không có lịch chiếu"}
      </h2>
      <div className="flex items-center cursor-pointer justify-between w-full max-w-5xl mb-4 gap-4">
        <i onClick={()=>{LeftClick()}} className="fa-solid fa-2xl fa-circle-arrow-left"></i>
        <div ref={slider} className="flex flex-row  gap-4 overflow-x-hidden max-w-5xl w-full pb-2">
        {Date.map((item, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-gray-900 text-white p-4 rounded-2xl shadow-lg flex-shrink-0 border border-white/10"
          >
            <div className="text-red-400 font-bold mb-2">{item.date}</div>
            <div className="text-lg font-semibold">{item.movie}</div>
            <div className="text-sm text-gray-300">
              <p>{item.cinema}</p>
              <p>Phòng: {item.room}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.times.map((time, idx) => (
                <span
                  onClick={() => {
                    handleClick(item.movie, time, item.date,item.room,item.image,item.location,item.location);
                  }}
                  key={idx}
                  className="bg-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer transition-colors"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

        <i onClick={()=>{RightClick()}} className="fa-solid fa-2xl cursor-pointer fa-circle-arrow-left fa-flip-horizontal"></i>
      </div>
      
      {Day.length > 0 && (
        <button className="mt-6 bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded-xl text-white font-semibold">
          Đặt Ngay
        </button>
      )}
    </div>
  );
};
