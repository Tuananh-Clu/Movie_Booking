import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { SeatsContext } from "../../config/filterSeat";

export const OptionPayment = ({orderId,amount,mergeStore}:{orderId:string,amount:string,mergeStore:any}) => {
  const [method, setMethod] = useState<"Cash" | "MOMO" | "Paypal" | null>(null);
  const {setStore}=useContext(SeatsContext)
  const navigate=useNavigate()
  const handleClick = (option: "Cash" | "MOMO" | "Paypal") => {
    setMethod(option);

  };
  const ClickToPayMentPage=(item:string)=>{
    navigate(`/Payment/${orderId}/${amount}/DangThanhToan/${item}`)
    setStore((prev)=>[...prev,[...mergeStore]])
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        💳 Phương Thức Thanh Toán
      </h2>

      {/* Options */}
      <div className="grid sm:grid-cols-3 text-black cursor-pointer gap-4">
        <button
          onClick={() => handleClick("Cash")}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition
            ${method === "Cash" ? "border-green-500 bg-green-50" : "border-gray-200 bg-white hover:border-green-400"}
          `}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
            alt="cash"
            className="w-8 h-8"
          />
          <span className="font-medium">Tiền mặt</span>
        </button>

        <button
          onClick={() => handleClick("MOMO")}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition
            ${method === "MOMO" ? "border-pink-500 bg-pink-50" : "border-gray-200 bg-white hover:border-pink-400"}
          `}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
            alt="momo"
            className="w-8 h-8"
          />
          <span className="font-medium">MoMo</span>
        </button>

        <button
          onClick={() => handleClick("Paypal")}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition
            ${method === "Paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-400"}
          `}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
            alt="paypal"
            className="w-8 h-8"
          />
          <span className="font-medium">PayPal</span>
        </button>
      </div>

      {/* Action */}
      {method && (
        <div className="mt-8 text-center">
          <h3 className="mb-4 text-lg font-medium">
            {method === "Cash"
              ? "Bạn sẽ thanh toán bằng tiền mặt tại quầy."
              : `Chuyển đến trang thanh toán của ${method}`}
          </h3>
          <button
          onClick={()=>ClickToPayMentPage(method)}
            className={`px-6 py-3 rounded-2xl text-white font-semibold shadow-md transition
              ${method === "MOMO"
                ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90"
                : method === "Paypal"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"}
            `}
          >
            Thanh Toán Ngay
          </button>
        </div>
      )}
    </div>
  );
};
