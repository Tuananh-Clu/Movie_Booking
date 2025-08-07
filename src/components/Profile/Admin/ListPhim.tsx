import axios from "axios";
import ticket from "../../../assets/ticket.png";
import { useEffect, useState } from "react";

export const ListPhim = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDataReport = async () => {
    try {
      const response = await axios(
        "https://backendformoviebooking-1.onrender.com/api/Cinema/GetSoLuongVeBan"
      );
      setTickets(response.data);
    } catch (err) {
      setError("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataReport();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex items-center gap-3 mb-6">
        <img src={ticket} alt="ticket" className="w-12 h-12" />
        <h1 className="text-3xl font-bold">Doanh Số Bán Vé Theo Phim</h1>
      </div>

      {loading && <p className="text-gray-300">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="px-4 py-3 border border-gray-600">ID</th>
                <th className="px-4 py-3 border border-gray-600">Poster</th>
                <th className="px-4 py-3 border border-gray-600">Tên Phim</th>
                <th className="px-4 py-3 border border-gray-600">Số Vé</th>
                <th className="px-4 py-3 border border-gray-600">Tổng Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 transition duration-150"
                >
                  <td className="px-4 py-2 border border-gray-700">{item.movieId}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-16 h-auto mx-auto rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-700 font-semibold">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">{item.count}</td>
                  <td className="px-4 py-2 border border-gray-700 text-green-400 font-medium">
                    {(item.count * 75000).toLocaleString("vi-VN")} ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
