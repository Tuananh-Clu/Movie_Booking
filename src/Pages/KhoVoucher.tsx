import { useState, useEffect } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import type { Voucher, VoucherUser } from "../types/type";
import { Gift, Calendar, Tag } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

export const KhoVoucher = () => {
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
  const {getToken}=useAuth()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Voucher/GetVoucher"
        );
        setDataVoucher(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);
  const handleClickSubmit=async(item:Voucher)=>{
      const token=await getToken()
        const data:VoucherUser[]=[{
            code:item.code,
            description:item.description,
            loaiGiam:item.loaiGiam,
            discountAmount:item.discountAmount,
            expirationDate:item.expirationDate,
            minimumOrderAmount:item.minimumOrderAmount,
            phamViApDung:item.phamViApDung,
            soLuotUserDuocDung:item.soLuotUserDuocDung,
            used:"DangGiu"
        }]
    try{
    
        await axios.post("https://backendformoviebooking-production.up.railway.app/api/Client/AddVoucher",data,{headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }})
        console.log("success")
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      <Navbar />
      <div className=" px-20 pt-40">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
          🎁 Kho Voucher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataVoucher.map((item, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
            >

              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-yellow-400" />
                <h2 className="text-xl font-semibold">{item.code}</h2>
              </div>

 
              <p className="text-sm text-gray-300 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-yellow-400" /> Mã:{" "}
                <span className="font-mono text-yellow-300">{item.code}</span>
              </p>

              <p className="text-sm text-gray-400 mb-3">{item.description}</p>

              <p className="text-sm flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4 text-yellow-400" />
                HSD: {new Date(item.expirationDate).toLocaleDateString("vi-VN")}
              </p>


              <button onClick={()=>handleClickSubmit(item)} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-xl shadow-md transition-colors">
                Lưu ngay
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20">
              <Footer />
      </div>
    </div>
  );
};
