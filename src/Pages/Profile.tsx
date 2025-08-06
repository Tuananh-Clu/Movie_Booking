import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Database } from "../types/type";
import { DashBoard } from "../components/Profile/Admin/DashBoard";
import { NowBooking } from "../components/Profile/Admin/NowBooking";
import { DoanhThuRap } from "../components/Profile/Admin/DoanhThuRap";
import { ListPhim } from "../components/Profile/Admin/ListPhim";
import { AddPhim } from "../components/Profile/Admin/AddPhim";

export const Profile = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [userData, setUserData] = useState<Database>();
  const [userLength, setUserLength] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [doanhThu, setDoanhThu] = useState(0);

  const [clickState, setClickState] = useState("DashBoard");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = await getToken();
        const userRes = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/Client/GetUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const allUser = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/Client/GetAllUser"
        );
        const ticketRes = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/Client/GetQuantityTicket"
        );
        const revenueRes = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/Client/GetDoanhthuTicket"
        );

        setUserData(userRes.data);
        setUserLength(allUser.data.length);
        setTicket(ticketRes.data);
        setDoanhThu(revenueRes.data);
      } catch (err) {
        console.log("Lỗi lấy dữ liệu:", err);
      }
    };

    fetchAll();
  }, []);

  const renderContent = () => {
    switch (clickState) {
      case "DashBoard":
        return (
          <div>
            <DashBoard quantity={userLength} ticket={ticket} doanhthu={doanhThu} />
            <NowBooking />
          </div>
        );
      case "Doanh Thu":
        return <DoanhThuRap />;
      case "Danh Sach":
        return <ListPhim />;
      case "Phim":
        return <AddPhim />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-600 min-h-screen w-full">
      <Navbar />
      <div className="pt-40 px-10 md:px-20 flex flex-col md:flex-row gap-5">
        {/* Sidebar */}
        <div className="bg-gray-400/70 p-5 flex flex-col items-center rounded-2xl min-w-[220px]">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={user?.imageUrl}
            alt="Avatar"
          />
          <h1 className="text-white mt-3 text-xl font-bold text-center">
            {user?.fullName}
          </h1>
          <p className="text-white text-sm">{userData?.role}</p>

          <div className="w-full h-0.5 mt-3 bg-white"></div>

          <ul className="mt-5 w-full flex flex-col gap-4 text-white">
            {[
              { label: "DashBoard", value: "DashBoard" },
              { label: "Doanh Thu", value: "Doanh Thu" },
              { label: "Tạo Danh Sách", value: "Danh Sach" },
              { label: "Danh Sách Phim", value: "Phim" },
            ].map((item) => (
              <li
                key={item.value}
                onClick={() => setClickState(item.value)}
                className={`${
                  clickState === item.value
                    ? "bg-white text-black"
                    : "bg-black text-white"
                } px-6 py-3 rounded-2xl text-center cursor-pointer hover:bg-gray-500 transition`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="bg-gray-400/70 p-5 rounded-2xl min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
