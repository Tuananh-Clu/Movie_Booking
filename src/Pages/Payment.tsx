import { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SeatsContext } from "../config/filterSeat";
import { LoadingSuccess } from "../components/PaymentComponents/LoadingSuccess";
import { OptionPayment } from "../components/PaymentComponents/OptionPayment";
import { InfoCustomer } from "../components/PaymentComponents/InfoCustomer";
import { Food } from "../components/PaymentComponents/Food";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const Payment = () => {
  const { seat, store, setStore, setSeat } = useContext(SeatsContext);
  const { getToken } = useAuth();
  const [popUp, setPopUp] = useState(false);
  const buttonPay = useRef<HTMLButtonElement>(null);
  const vipRow = ["D", "E", "F"];

  const totalPrice = seat.reduce((sum, item) => sum + item.price, 0);
  const [combo, setCombo] = useState([
    { name: "Bắp ngọt lớn", price: 45000, quantity: 0 },
    { name: "Nước Coca 500ml", price: 25000, quantity: 0 },
    { name: "Bánh ngọt", price: 30000, quantity: 0 },
    { name: "Khoai tây chiên", price: 40000, quantity: 0 },
    { name: "Nước suối", price: 15000, quantity: 0 },
    { name: "Bắp phô mai", price: 50000, quantity: 0 },
    { name: "Nước trà xanh", price: 20000, quantity: 0 },
    { name: "Bánh mì kẹp", price: 35000, quantity: 0 },
    { name: "Nước cam tươi", price: 30000, quantity: 0 },
    { name: "Bánh quy giòn", price: 18000, quantity: 0 },
  ]);
  const comboTotal = combo.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const finalTotal = totalPrice + comboTotal;
  const sharedInfo = seat[0] || {};

  const mergeStore = seat.map((item) => ({
    ...item,
    date:item.date||  sharedInfo.date,
    movieTitle:  sharedInfo.movieTitle,
    time:  sharedInfo.time,
    image: item.image || sharedInfo.image,
    Location: item.Location || sharedInfo.Location,
    city: item.city || sharedInfo.city,
    roomId: item.roomId || sharedInfo.roomId,
  }));

  const FetchUser = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const response = await axios.post(
        "https://backendformoviebooking-1.onrender.com/api/Client/Up",
        store,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("succees");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const successPay = async () => {
    setStore((prev) => [...prev, [...mergeStore]]);
    setPopUp(true);
  };
  useEffect(() => {
    FetchUser();
  }, [successPay]);
  useEffect(() => {
    if (popUp) {
      setTimeout(() => {
        setStore([]);
        setSeat([]);
      }, 2000);
    }
  }, [popUp]);

  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://cineverse.id/wp-content/uploads/2023/06/cgv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="text-white"
    >
      <Navbar />
      {popUp && <LoadingSuccess />}

      <div className="pt-32 pb-16 flex justify-center">
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full px-6">
          {/* LEFT */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {/* Thông Tin Vé */}
            {seat[0] && (
              <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-900">
                <h2 className="text-2xl font-bold border-b pb-3 mb-4">
                  🎟️ Thông Tin Vé
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    className="w-full md:w-40 rounded-xl shadow"
                    src={seat[0].image}
                    alt="movie"
                  />
                  <div className="flex flex-col gap-1 text-base">
                    <p>
                      <b>Phim:</b> {seat[0].movieTitle}
                    </p>
                    <p>
                      <b>Ghế:</b> {seat.map((item) => item.id).join(", ")}
                    </p>
                    <p>
                      <b>Thời gian:</b> {seat[0].time} {seat[0].date}
                    </p>
                    <p>
                      <b>Giá vé:</b> {totalPrice.toLocaleString()} VNĐ
                    </p>
                    <p>
                      <b>Loại ghế:</b>{" "}
                      {seat
                        .slice(1)
                        .map(
                          (items) =>
                            `${items.id} (${
                              vipRow.includes(items.id.charAt(0))
                                ? "VIP"
                                : "Regular"
                            })`
                        )
                        .join(", ")}
                    </p>
                    <p>
                      <b>Địa Chỉ:</b> {seat[0].Location}
                    </p>
                    <p>
                      <b>Thành Phố:</b> {seat[0].city}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Đồ Ăn */}
            <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-900">
              <h2 className="text-2xl font-bold border-b pb-3 mb-4">
                🍿 Đồ ăn & Thức uống
              </h2>
              <Food combo={combo} setState={setCombo} combototal={comboTotal} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-900 flex flex-col gap-6">
              <div className="w-full">
                <InfoCustomer />
              </div>
              <div className="mt-6">
                <OptionPayment />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-900">
              <h2 className="text-xl font-bold border-b pb-3 mb-4">
                💰 Thanh Toán
              </h2>
              <p className="text-xl font-semibold mb-4">
                Tổng cộng:{" "}
                <span className="text-[#E71A0F]">
                  {finalTotal.toLocaleString()} VNĐ
                </span>
              </p>
              <button
                ref={buttonPay}
                className="w-full bg-[#E71A0F] hover:bg-[#C5120A] text-white py-3 text-lg rounded-full font-bold shadow transition"
                onClick={successPay}
              >
                🛒 Xác Nhận Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
