import { useEffect, useState } from "react";
import { Ticket, Calendar, AlertCircle, Pause, Play } from "lucide-react";
import axios from "axios";
import type { Voucher } from "../../../types/type";

export const KhoVoucher = () => {
  const [voucherData, setVoucherData] = useState<Voucher[]>([]);

 

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isExpired = (dateString: any) => {
    return new Date(dateString) < new Date();
  };
  const handleChangeProp=async(item:string)=>{
    try{
        await axios.post(`https://backendformoviebooking-production.up.railway.app/api/Voucher/Change?VoucherCode=${item}`);

    }
    catch(error){
        console.log(error)
    }
  }

   useEffect(() => {
    const fetchAll = async () => {
      try {
        const fetchAll = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Voucher/GetVoucher"
        );
        setVoucherData(fetchAll.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, [handleChangeProp]);
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-600 rounded-xl shadow-lg">
            <Ticket className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">
              Kho Lưu Trữ Voucher
            </h1>
            <p className="text-purple-200 mt-2">
              Quản lý tất cả voucher và mã giảm giá
            </p>
          </div>
        </div>

        {voucherData.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20 shadow-xl">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-300">
              Hiện Tại Chưa Có Voucher Nào Cả!!!
            </h1>
            <p className="text-gray-400 mt-2">
              Hãy tạo voucher đầu tiên của bạn
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-3">
            {voucherData.map((item, index) => {
              const expired = isExpired(item);
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex flex-row justify-between text-white">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-purple-600 px-4 py-2 rounded-full shadow-lg">
                          <h1 className="font-bold text-lg">{item.code}</h1>
                        </div>
                        {expired && (
                          <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-medium border border-red-500/30">
                            Hết hạn
                          </span>
                        )}
                      </div>

                      <h1 className="text-gray-300 mb-3 leading-relaxed">
                        {item.description}
                      </h1>

                      <div className="flex items-center gap-2 text-purple-200">
                        <Calendar className="h-5 w-5" />
                        <h1 className="text-sm">
                          Hết hạn: {formatDate(item.expirationDate)}
                        </h1>
                      </div>
                    </div>

           
                    <div className="flex flex-col gap-4 items-center min-w-[160px]">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full shadow-lg ${
                            item.isActive === "true"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <h1
                          className={`text-center font-semibold ${
                            item.isActive === "true"
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {item.isActive === "true"
                            ? "Đang Hoạt Động"
                            : "Tạm Ngưng"}
                        </h1>
                      </div>

                      <button
                     
                        className={`px-4 py-3 rounded-2xl font-semibold transition-all duration-200 hover:transform hover:scale-105 shadow-lg flex items-center gap-2 ${
                          item.isActive === "false"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {item.isActive === "true" ? (
                          <div onClick={()=>handleChangeProp(item.code)} className="cursor-pointer flex flex-row items-center">
                            <Pause   className="h-4 w-4" />
                            Ngừng Hoạt Động
                          </div>
                        ) : (
                          <div  onClick={()=>handleChangeProp(item.code)} className="cursor-pointer flex flex-row items-center">
                            <Play  className="h-4 w-4" />
                            Hoạt Động
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
