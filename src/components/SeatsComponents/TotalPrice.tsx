import React, { useEffect } from 'react'
import { SeatsContext } from '../../config/filterSeat';
import { useNavigate } from 'react-router';
import { SignInButton, useUser } from '@clerk/clerk-react';

export const TotalPrice = () => {
    const { seat } = React.useContext(SeatsContext);
    const {isSignedIn}=useUser();
    useEffect(()=> {console.log(seat)}, [seat]);
    const navigate =useNavigate();
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full max-w-1/2 mx-auto mt-6">
      <h2 className="text-lg font-semibold">Tổng giá vé</h2>
      {seat.length > 0 ? (
        <div className='flex flex-row justify-between items-center'>
          <div>
            <h1>Ghế Đã Chọn: {seat.map((item) => item.id).join(" ")}</h1>
            <h1>Tổng Giá Tiền :{seat.reduce((total,item)=>total+item.price,0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h1>
        </div>
        <div>
          {isSignedIn?<button onClick={() => navigate('/Payment')} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>Xác Nhận Đặt Vé</button>:
          <SignInButton mode='modal'>
                     <button  className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>Bạn Cần Đăng Nhập Tài Khoản</button>
            </SignInButton>}
            
        </div>
        </div>
      ) : (
        "Chưa có vé nào"
      )}
    </div>
  )
}
