import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const GialapThanhToan = () => {
  const { orderid, amount, method } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = (status: "success" | "fail") => {
    if (status === "fail") {
      navigate(-1); // quay lại trang trước
      return;
    }

    // giả lập loading
    setLoading(true);
    setTimeout(() => {
      navigate(`/Result/${orderid}/${amount}/${status}/${method}`);
    }, 2000); // 2 giây loading
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      {method === "Paypal" ? (
        // ===== PAYPAL UI =====
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px] text-center border border-blue-200">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="w-36 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Pay with PayPal
          </h2>

          <div className="mb-6">
            <p className="text-gray-600">Order ID:</p>
            <p className="font-semibold">{orderid}</p>
            <p className="text-gray-600 mt-3">Total Amount:</p>
            <p className="font-bold text-lg text-blue-700">{amount} USD</p>
          </div>

          {loading ? (
            <p className="text-blue-600 font-semibold flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
              Đang xử lý thanh toán...
            </p>
          ) : (
            <>
              <button
                onClick={() => handlePayment("success")}
                className="w-full mb-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold hover:opacity-90 transition"
              >
                ✅ Pay Now
              </button>
              <button
                onClick={() => handlePayment("fail")}
                className="w-full py-2 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      ) : (
        // ===== MOMO UI =====
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px] text-center border border-pink-200">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
            alt="MoMo"
            className="w-24 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            Thanh toán MoMo
          </h2>

          <div className="mb-6">
            <p className="text-gray-600">Mã đơn hàng:</p>
            <p className="font-semibold">{orderid}</p>
            <p className="text-gray-600 mt-3">Số tiền:</p>
            <p className="font-bold text-lg text-pink-600">{amount} VNĐ</p>
          </div>

          {loading ? (
            <p className="text-pink-600 font-semibold flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></span>
              Đang xử lý thanh toán...
            </p>
          ) : (
            <>
              <button
                onClick={() => handlePayment("success")}
                className="w-full mb-3 py-2 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition"
              >
                ✅ Thanh toán ngay
              </button>
              <button
                onClick={() => handlePayment("fail")}
                className="w-full py-2 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                ❌ Hủy
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
