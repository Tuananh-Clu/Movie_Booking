import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import {  useEffect, useState } from "react";
import type { Database } from "../types/type";
import { DashBoard } from "../components/Profile/Admin/DashBoard";
import { NowBooking } from "../components/Profile/Admin/NowBooking";
import { DoanhThuRap } from "../components/Profile/Admin/DoanhThuRap";
import { ListPhim } from "../components/Profile/Admin/ListPhim";
import { AddPhim } from "../components/Profile/Admin/AddPhim";
import { DanhSachPhimYeuThich } from "../components/Profile/User/DanhSachPhimYeuThich";
import { MaGiamGia } from "../components/Profile/User/MaGiamGia";
import { DashBoardUser } from "../components/Profile/User/DashBoardUser";

export const Profile = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [userData, setUserData] = useState<Database>();
  const [userLength, setUserLength] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [doanhThu, setDoanhThu] = useState(0);

  const [clickState, setClickState] = useState(userData?.role === "Admin" ? "DashBoard" : userData?.role === "User" ? "DashBoardUser" : "DashBoard");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = await getToken();
        const [userRes, allUser, ticketRes, revenueRes] = await Promise.all([
          axios.get("https://backendformoviebooking-1.onrender.com/api/Client/GetUser", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://backendformoviebooking-1.onrender.com/api/Client/GetAllUser"),
          axios.get("https://backendformoviebooking-1.onrender.com/api/Client/GetQuantityTicket"),
          axios.get("https://backendformoviebooking-1.onrender.com/api/Client/GetDoanhthuTicket"),
        ]);

        setUserData(userRes.data);
        setUserLength(allUser.data.length);
        setTicket(ticketRes.data);
        setDoanhThu(revenueRes.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
    };
    fetchAll();
  }, []);

  // Admin: render content theo click
  const renderContent = () => {
    switch (clickState) {
      case "DashBoard":
        return (
          <>
            <DashBoard quantity={userLength} ticket={ticket} doanhthu={doanhThu} />
            <NowBooking />
          </>
        );
      case "Doanh Thu":
        return <DoanhThuRap />;
      case "Danh Sach":
        return <ListPhim />;
      case "Phim":
        return <AddPhim />;
     
        case "Phim Yêu Thích":
          return <DanhSachPhimYeuThich/>
          case "Mã Giảm Giá":
            return <MaGiamGia/>
            case "DashBoardUser":
              return <DashBoardUser/>
      default:
        return null;
    }
  };


  // Sidebar component
  const Sidebar = () => {
    if (userData?.role === "Admin") {
      const items = [
        { label: "DashBoard", value: "DashBoard" },
        { label: "Doanh Thu", value: "Doanh Thu" },
        { label: "Quản Lý Phim", value: "Danh Sach" },
        { label: "Tạo Suất Chiếu", value: "Phim" },
      ];
      return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-3xl flex flex-col items-center min-w-[250px] shadow-lg">
          <img className="w-32 h-32 rounded-full object-cover border-4 border-white" src={user?.imageUrl} alt="Avatar" />
          <h2 className="mt-4 text-white text-xl font-bold text-center">{user?.fullName}</h2>
          <p className="text-gray-300">{userData?.role}</p>
          <hr className="w-full my-4 border-gray-400" />
          <ul className=" flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.value}
                onClick={() => setClickState(item.value)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-center font-medium transition-all ${
                  clickState === item.value ? "bg-white text-black shadow-md" : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      const items = ["DashBoard","Mã Giảm Giá", "Phim Yêu Thích"];
      return (
        <div className="bg-gray-900/80 p-6 flex flex-col items-center rounded-3xl min-w-[250px] shadow-lg">
          <img className="w-32 h-32 rounded-full object-cover border-4 border-red-500" src={user?.imageUrl} alt="Avatar" />
          <h2 className="mt-4 text-white text-xl font-bold text-center">{user?.fullName}</h2>
          <p className="text-gray-300">{userData?.role}</p>
          <ul className="mt-6 flex flex-col gap-3 w-full">
            {items.map((item) => (
              <li onClick={() => setClickState(item)} key={item} className="text-white text-center p-3 rounded-xl hover:bg-white hover:text-red-600 cursor-pointer transition-all shadow-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-600 min-h-screen w-full">
      <Navbar />
      <div className="pt-32 px-6 md:px-20 flex flex-col md:flex-row gap-6">
        <Sidebar />
        <div className={`flex-1 rounded-3xl w-6/8 min-h-[600px] p-6 ${userData?.role === "Admin" ? "bg-gray-100/10 backdrop-blur-md shadow-inner" : "bg-gray-800/30 backdrop-blur-md shadow-inner"}`}>
          {userData?.role === "Admin" ? renderContent() : userData?.role === "User" ? renderContent() :renderContent()}
        </div>
      </div>
    </div>
  );
};
