import { useUser } from "@clerk/clerk-react";
import { Tag } from "lucide-react";
import type React from "react";


type InfoCustomer={
  popupVoucher:boolean
  setState:React.Dispatch<React.SetStateAction<boolean>>
  dataVoucher:{
     code:string,
    giagiam:number,
    loaiGiam:string
  }
}

export const InfoCustomer:React.FC<InfoCustomer> = ({setState,popupVoucher,dataVoucher}) => {
  const { user } = useUser();
  return (
    <>
      <div className="rounded-2xl shadow-xl p-6 space-y-6 text-white bg-white/5 backdrop-blur ring-1 ring-white/10">
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
            👤 Thông Tin Khách Hàng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-base">
            <div>
              <span className="font-semibold">Họ và tên:</span> {user?.fullName}
            </div>
            <div>
              <span className="font-semibold">SĐT:</span>{" "}
              {user?.phoneNumbers[0]?.phoneNumber}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {user?.emailAddresses[0]?.emailAddress}
            </div>
            <div>
              <span className="font-semibold">Ngày đặt:</span>{" "}
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 rounded-2xl shadow-xl p-6 space-y-6 text-white bg-white/5 backdrop-blur ring-1 ring-white/10">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Tag className="w-5 h-5 text-[--color-brand-cyan]" />
          Mã Giảm Giá
        </h1>
        {popupVoucher?
        <div className="flex flex-row bg-gray-700 rounded-2xl p-3 text-white items-center justify-between">
          <h1>{dataVoucher.code}</h1>
          <h1>{dataVoucher.giagiam}{" "}{dataVoucher.loaiGiam=="Value"?"VND":"%"}</h1>
        </div>:""}

        <p
        onClick={()=>setState(true)}
          className="text-sm text-gray-300 cursor-pointer hover:text-pink-600"
        >
          🔍 Tìm kiếm mã voucher trong kho của bạn
        </p>
      </div>
    </>
  );
};
