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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border ring-1 ring-white/10 bg-white/5 backdrop-blur ${
                    method === "Cash" ? "outline outline-2 outline-[--color-brand-cyan]" : ""
                  } transition`}
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
                  className={`flex items-center gap-2 px-4 py-2  rounded-xl border ring-1 ring-white/10 bg-white/5 backdrop-blur ${
                    method === "MOMO" ? "outline outline-2 outline-[--color-brand-cyan]" : ""
                  } transition`}
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
                  className={`flex items-center gap-2 px-4 py-2  rounded-xl border ring-1 ring-white/10 bg-white/5 backdrop-blur ${
                    method === "Paypal"
                      ? "outline outline-2 outline-[--color-brand-cyan]"
                      : ""
                  } transition`}
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
                  <button className="px-5 py-3 rounded-2xl text-white bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90">
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
                      className="w-80 p-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[--color-brand-cyan] text-white placeholder-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Số Tài Khoản / Email PayPal"
                      className="w-80 p-3 rounded-xl bg-white/5 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[--color-brand-cyan] text-white placeholder-gray-400"
                    />

                    <button
                      onClick={() => buttonPay.current?.scrollIntoView()}
                      className="px-5 py-3 rounded-2xl text-white bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90"
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
