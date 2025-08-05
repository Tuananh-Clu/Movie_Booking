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
  const [ticket, setTicket] = useState<number>(0);
  const [DoanhThu, setDoanhThu] = useState<number>(0);

  const FetchUser = async () => {
    try {
      const token = await getToken();
      const response = await axios(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data);
      console.log("UserData từ API:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FetchUserlength = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetAllUser"
      );
      setUserLength(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchSoVe = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetQuantityTicket"
      );
      setTicket(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchDoanthu = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetDoanhthuTicket"
      );
      setDoanhThu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUser();
    FetchUserlength();
    FetchSoVe();
    FetchDoanthu();
    console.log(userData);
  }, []);
  const [clickState, setClickState] = useState<string>("DashBoard");
  const HandleClick = (item: string) => {
    setClickState(item);
  };

  return (
    <div className=" bg-gray-600 w-full z-0 h-auto">
      <Navbar />
      <div className="pt-40 px-20 flex flex-row gap-5">
        <div className="bg-gray-400/70 p-5 flex flex-col items-center rounded-2xl">
          <img className="w-40 h-40 rounded-full" src={user?.imageUrl} />
          <h1 className="text-white mt-3 text-2xl font-bold">
            {user?.fullName}
          </h1>
          <h1 className="text-white text-sm">{userData?.role}</h1>
          <div className="w-full h-0.5 mt-3 bg-white"></div>
          <ul className="mt-5 items-center flex flex-col gap-4 w-full text-white">
            <li
              onClick={() => HandleClick("DashBoard")}
              className={`${
                clickState == "DashBoard" ? "bg-white text-black" : "bg-black"
              } px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer`}
            >
              DashBoard
            </li>
            <li
              onClick={() => HandleClick("Doanh Thu")}
              className={`${
                clickState == "Doanh Thu" ? "bg-white text-black" : "bg-black"
              } px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer`}
            >
              Doanh Thu
            </li>
            <li
              onClick={() => HandleClick("Danh Sach")}
              className={`${
                clickState == "Danh Sach" ? "bg-white text-black" : "bg-black"
              } px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer`}
            >
              Tạo Danh Sách
            </li>
            <li
              onClick={() => HandleClick("Phim")}
              className={`${
                clickState == "Phim" ? "bg-white text-black" : "bg-black"
              } px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer`}
            >
              Danh Sách Phim
            </li>
          </ul>
        </div>
        <div className="bg-gray-400/70 p-5 rounded-2xl w-full h-full">
          {clickState == "DashBoard" ? (
            <div>
              <DashBoard
                quantity={userLength}
                ticket={ticket}
                doanhthu={DoanhThu}
              />
              <NowBooking />
            </div>
          ) : clickState == "Doanh Thu" ? (
            <DoanhThuRap />
          ) : clickState == "Danh Sach" ? (
            <ListPhim />
          ) : clickState == "Phim" ? (
            <AddPhim />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
