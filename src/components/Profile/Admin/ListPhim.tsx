import axios from "axios";
import ticket from "../../../assets/ticket.png";
import { useEffect, useState } from "react";

export const ListPhim = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const fetchDataReport = async () => {
    try {
      const response = await axios(
        "https://backendformoviebooking-1.onrender.com/api/Cinema/GetSoLuongVeBan"
      );
      setTickets(response.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchDataReport();
  }, []);
  return (
    <div>
      <div className=" flex flex-row items-center gap-2">
        <img className="w-10 h-10" src={ticket} alt="" />
        <h1 className="text-2xl text-white font-bold">
          Doanh Số Bán Vé Theo Phim
        </h1>
        <table>
          <tr>
            <th>Id</th>
            <th>Poster</th>
            <th>Tên Phim</th>
            <th>Số Vé</th>
            <th>Tổng Số</th>
          </tr>

          {tickets.map((item, index) => {
            return (
              <tr>
                <th>
                  <h1>{item.movieId}</h1>
                </th>
                <th key={index}>
                  <img src={item.poster} alt="" />
                </th>
                <th>
                  <h1>{item.title}</h1>
                </th>
                <th>
                  <h1>{item.count}</h1>
                </th>
                <th>
                  <h1>{((item.count)*75000).toLocaleString("vi-VN")}vN</h1>
                </th>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
