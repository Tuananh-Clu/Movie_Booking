import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useAuth, useUser } from "../config/AuthContext";
import {  useEffect, useRef, useState } from "react";
import type { TierMember ,Database } from "../types/type";
import { DashBoard } from "../components/Profile/Admin/DashBoard";
import { NowBooking } from "../components/Profile/Admin/NowBooking";
import { DoanhThuRap } from "../components/Profile/Admin/DoanhThuRap";
import { ListPhim } from "../components/Profile/Admin/ListPhim";
import { AddPhim } from "../components/Profile/Admin/AddPhim";
import { DanhSachPhimYeuThich } from "../components/Profile/User/DanhSachPhimYeuThich";
import { MaGiamGia } from "../components/Profile/User/MaGiamGia";
import { DashBoardUser } from "../components/Profile/User/DashBoardUser";
import { CreateMaGiamGia } from "../components/Profile/Admin/CreateMaGiamGia";
import { KhoVoucher } from "../components/Profile/Admin/KhoVoucher";
import { Crown, Diamond, Medal, Star } from "lucide-react";
import { API_CONFIG, buildApiUrl } from "../config/api";

export const Profile = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [userData, setUserData] = useState<Database>();
  const [userLength, setUserLength] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [doanhThu, setDoanhThu] = useState(0);
  const [dataRole, setDataRole] = useState<TierMember[]>()

  const [clickState, setClickState] = useState("");

  useEffect(() => {
    if (userData?.role === "Admin") {
      setClickState("DashBoard");
    } else if (userData?.role === "User") {
      setClickState("Overview");
    } else {
      setClickState("DashBoard");
    }
  }, [userData]);

  useEffect(() => {
    const fetchAll = async () => {
      if (!isSignedIn) return;
      
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const [userRes, allUser, ticketRes, revenueRes, datarole] = await Promise.all([
          axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_USER), { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_ALL_USER)),
          axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_QUANTITY_TICKET)),
          axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_DOANHTHU_TICKET)),
          axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MEMBER_SHIP), { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setUserData(userRes.data);
        setUserLength(allUser.data.length);
        setTicket(ticketRes.data);
        setDoanhThu(revenueRes.data);
        setDataRole(datarole.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
      }
    };
    fetchAll();
  }, [isSignedIn]);

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
     case "Voucher":
      return <KhoVoucher/>
        case "Phim Yêu Thích":
          return <DanhSachPhimYeuThich/>
          case "Tạo Mã Giảm Giá":
          return<CreateMaGiamGia/>
          case "Mã Giảm Giá":
            return <MaGiamGia/>
            case "Overview":
              return <DashBoardUser/>
        
      default:
        return null;
    }
  };
    const tier=dataRole?.find((item)=>item)
  const current=useRef<HTMLDivElement|null>(null);
  const handleClick=(item:string)=>{
    setClickState(item)
    if(current){
      current.current?.scrollIntoView({behavior:"smooth","inline":"start"});
    }
  }

  // Sidebar component
  const Sidebar = () => {
    if (userData?.role === "Admin") {
      const items = [
        { label: "DashBoard", value: "DashBoard" },
        { label: "Doanh Thu", value: "Doanh Thu" },
        { label: "Quản Lý Phim", value: "Danh Sach" },
        { label: "Tạo Suất Chiếu", value: "Phim" },
        {label:"Tạo Mã Giảm Giá", value:"Tạo Mã Giảm Giá"},
        {label:"Kho Voucher",value:"Voucher"}
      ];
      return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-3xl flex flex-col items-center min-w-[250px]  shadow-lg">
          <img className="w-32 h-32 rounded-full object-cover border-4 border-white" src={user?.avatar} alt="Avatar" />
          <h2 className="mt-4 text-white text-xl font-bold text-center">{user?.name}</h2>
          <p className={`text-gray-300 `}>{tier?.role}</p>
          <hr className="w-full my-4 border-gray-400" />
          <ul className=" flex md:flex-col flex-wrap gap-3">
            {items.map((item) => (
              <li
                key={item.value}
                onClick={() => handleClick(item.value)}
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
      const items = ["Overview","Mã Giảm Giá", "Phim Yêu Thích"];
      return (
        <div className="bg-gray-900/80 p-6 flex flex-col items-center rounded-3xl min-w-[250px]  shadow-lg">
          <img className="w-32 h-32 rounded-full object-cover border-4 border-red-500" src={user?.avatar} alt="Avatar" />
         <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-gray-800 text-white w-fit shadow-md">
          <h2 className=" text-white text-xl font-bold text-center">{user?.name}</h2>
          {
            tier?.role=="Bronze"? <Medal className="w-5 h-5 text-orange-700" />:
                           tier?.role=="Silver"?<Medal className="w-5 h-5 text-gray-400" />:
                            tier?.role=="Gold" ?<Medal className="w-5 h-5 text-yellow-500" />:
                             tier?.role=="Platinum"?<Star className="w-5 h-5 text-slate-200" />:
                             tier?.role=="Diamond"?<Diamond className="w-5 h-5 text-cyan-400" />:
                              <Crown className="w-5 h-5 text-purple-500" />
          }
            <span className="font-semibold">{tier?.role}</span>
          </div>

          <ul className="mt-6 flex flex-col gap-3 w-full">
            {items.map((item) => (
              <li onClick={() => handleClick(item)} key={item} className="text-white text-center p-3 rounded-xl hover:bg-white hover:text-red-600 cursor-pointer transition-all shadow-sm">
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
      <div 
       className="pt-32 px-6  md:px-20 flex flex-col md:flex-row gap-6">
                  <Sidebar />
        <div ref={current} className={`flex-1  rounded-3xl md:w-6/8 min-h-[600px] p-6 pt-20 md:pt-0 ${userData?.role === "Admin" ? "bg-gray-100/10 backdrop-blur-md shadow-inner" : "bg-gray-800/30 backdrop-blur-md shadow-inner"}`}>
          {userData?.role === "Admin" ? renderContent() : userData?.role === "User" ? renderContent() :renderContent()}
        </div>
      </div>
    </div>
  );
};
