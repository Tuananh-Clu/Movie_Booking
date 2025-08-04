import { Navbar } from "../components/Navbar";

import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { Database } from "../types/type";
import { DashBoard } from "../components/Profile/Admin/DashBoard";
export const Profile = () => {
  const { getToken } = useAuth();
  const {user}=useUser();
  const [userData,setUserData]=useState<Database[]>([]);
  const [userLength,setUserLength]=useState(0);
  const FetchUser = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const response = await axios.post(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("succees");
      setUserData(response.data)
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    FetchUser
  })
    const FetchUserlength = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const response = await axios.post(
        "https://backendformoviebooking-1.onrender.com/api/Client/GetAllUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("succees");
    setUserLength(response.data.length)
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    FetchUserlength
  })

  return (
    <div className=" bg-gray-600 w-full z-0 h-screen">
      <Navbar />
      <div className="pt-40 px-20 flex flex-row gap-5" >
        <div className="bg-gray-400/70 p-5  flex flex-col items-center rounded-2xl">
            <img className="w-40 h-40 rounded-full" src={user?.imageUrl}></img>
            <h1 className="text-white mt-3 text-2xl font-bold">{user?.fullName}</h1>
            <h1>{userData.map((item)=>item.role)}</h1>
            <div className="w-full h-0.5 mt-3 bg-white"></div>
            <ul className="mt-5 items-center flex flex-col gap-4 w-full text-white">
                <li className="bg-black px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer">DashBoard</li>
                <li  className="bg-black px-10 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer">Doanh Thu</li>
                <li  className="bg-black px-6 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer">Tạo Danh Sách</li>
                <li  className="bg-black px-6 py-4 rounded-2xl hover:bg-gray-500 cursor-pointer">Danh Sách Phim</li>
            </ul>
        </div>
        <div className="bg-gray-400/70 p-5  w-full h-full">
        <DashBoard quantity={userLength}/>
        </div>
      </div>
    </div>
  );
};
