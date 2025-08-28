import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SeatsContext } from "../config/filterSeat";




export const KetQuaThongBaoThanhToan = () => {
 const { orderid,method,status } = useParams();
 const {getToken}=useAuth();
 const {store,setStore}=useContext(SeatsContext);
 const navigate=useNavigate()
 const upTicket=async()=>{
   try {
      const token = await getToken();
      await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/Up",
        store,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(token)
      console.log("✅ Upload store success");
    } catch (error) {
      console.log("❌ Upload error:", error);
    }

 }
 useEffect(()=>{
  if(status=="success"){
    upTicket()
    setTimeout(() => {
    navigate("/")
    },3000);

  }
  else{
    navigate("/")
    setStore([]);
  }
 })
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">Kết quả Thanh toán</h2>
        <p className="mb-1">Order ID: {orderid}</p>
        <p className="mb-1">Phương thức: {method?.toUpperCase()}</p>
        {status === "success" ? (
          <p className="text-green-600 font-bold text-lg">
            ✅ Thanh toán thành công
          </p>
        ) : (
          <p className="text-red-600 font-bold text-lg">
            ❌ Thanh toán thất bại
          </p>
        )}
      </div>
    </div>
  );
};
