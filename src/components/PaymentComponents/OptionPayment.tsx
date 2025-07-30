import { useRef, useState } from "react";

export const OptionPayment = () => {
    const buttonPay = useRef<HTMLButtonElement>(null);
      const [method, setMethod] = useState<"Cash" | "MOMO" | "Paypal" | null>(null);
     const handleClick = (Aka: "Cash" | "MOMO" | "Paypal") => {
    setMethod(Aka);
  };
  return (
    <div>
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">
                💳 Phương Thức Thanh Toán
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleClick("Cash")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border  border-gray-300 ${
                    method === "Cash" ? "bg-cyan-400 text-white" : "bg-red-400"
                  } hover:bg-gray-100 transition`}
                >
                  <img
                    src=" https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
                    alt="cash"
                    className="w-6 h-6"
                  />
                  <span>Tiền mặt</span>
                </button>
                <button
                  onClick={() => handleClick("MOMO")}
                  className={`flex items-center gap-2 px-4 py-2  rounded-xl border ${
                    method === "MOMO" ? "bg-cyan-400 text-white" : "bg-red-400"
                  } border-gray-300 hover:bg-gray-100 transition`}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png "
                    alt="momo"
                    className="w-6 h-6"
                  />
                  <span>MoMo</span>
                </button>
                <button
                  onClick={() => handleClick("Paypal")}
                  className={`flex items-center gap-2 px-4 py-2  rounded-xl border ${
                    method === "Paypal"
                      ? "bg-cyan-400 text-white"
                      : "bg-red-400"
                  } border-gray-300 hover:bg-gray-100 transition`}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
                    alt="card"
                    className="w-6 h-6"
                  />
                  <span>Thẻ ngân hàng</span>
                </button>
              </div>
              {method === "MOMO" ? (
                <div className="text-center mt-10 flex flex-col gap-2">
                  <h1>Chuyển Đến Trang Thanh Toán Của Momo</h1>
                  <button className="bg-red-500 p-3 rounded-2xl ">
                    Đến Ngay
                  </button>
                </div>
              ) : method === "Paypal" ? (
                <div>
                  <div className="text-center mt-10 flex flex-col gap-4 items-center">
                    <h1 className="text-xl font-semibold">
                      Nhập Thông Tin Tài Khoản PayPal
                    </h1>

                    <input
                      type="text"
                      placeholder="Tên Chủ Tài Khoản"
                      className="w-80 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="text"
                      placeholder="Số Tài Khoản / Email PayPal"
                      className="w-80 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      onClick={() => buttonPay.current?.scrollIntoView()}
                      className="bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 transition-colors"
                    >
                      Xác Nhận Thanh Toán
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
  )
}
