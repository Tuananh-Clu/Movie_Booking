import { useNavigate, useParams} from "react-router-dom"


export const GialapThanhToan = () => {
   const { orderid, amount,method } = useParams();
    const navigate=useNavigate()
    const handlePayment=(item:string)=>{
        navigate(`/Result/${orderid}/${amount}/${item}/${method}`)
    }
  return (
    <div  className="flex flex-col items-center justify-center min-h-screen bg-blue-100 font-sans">
        {method=="Paypal"?
        //paypal
         <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="w-32 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          Thanh toán PayPal
        </h2>
        <p className="mb-1">Order ID: {orderid}</p>
        <p className="mb-6 font-semibold">Số tiền: {amount} USD</p>

        <button
          onClick={() => handlePayment("success")}
          className="w-full mb-3 py-2 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
        >
          ✅ Thanh toán
        </button>
        <button
          onClick={() => handlePayment("fail")}
          className="w-full py-2 rounded-xl bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition"
        >
          ❌ Hủy Bỏ
        </button>
      </div>:
      //momo
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
          alt="MoMo"
          className="w-20 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-pink-600 mb-2">
          Thanh toán MoMo
        </h2>
        <p className="mb-1">Order ID: {orderid}</p>
        <p className="mb-6 font-semibold">Số tiền: {amount} VNĐ</p>

        <button
          onClick={() => handlePayment("success")}
          className="w-full mb-3 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition"
        >
          ✅ Thanh toán 
        </button>
        <button
          onClick={() => handlePayment("fail")}
          className="w-full py-2 rounded-xl bg-gray-300 text-gray-800 font-bold hover:bg-gray-400 transition"
        >
          ❌ Hủy Bỏ
        </button>
      </div>
        }
    </div>
  )
}
