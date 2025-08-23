import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import type { VoucherUser } from "../../../types/type";




export const MaGiamGia = () => {
  const [dataVoucherUser, setDataVoucherUser] = useState<VoucherUser[]>([]);
  const { getToken } = useAuth()
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetVoucher",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        console.log(response.data)
        setDataVoucherUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [getToken]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">🎟️ Mã Giảm Giá</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataVoucherUser.map(v => (
          <div  className="p-4 rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{v.code}</h3>
              <p className="text-sm text-gray-300">{v.description}</p>
              <p className="text-xs text-gray-400 mt-1">HSD: {v.expirationDate}</p>
            </div>
            <button className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90">Sao chép</button>
          </div>
        ))}
      </div>
    </div>
  );
}
