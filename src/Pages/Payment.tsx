import { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SeatsContext } from "../config/filterSeat";
import { LoadingSuccess } from "../components/PaymentComponents/LoadingSuccess";
import { OptionPayment } from "../components/PaymentComponents/OptionPayment";
import { InfoCustomer } from "../components/PaymentComponents/InfoCustomer";
import { Food } from "../components/PaymentComponents/Food";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import type { TierMember, VoucherUser } from "../types/type";
import { ArrowBigLeftDashIcon } from "lucide-react";
import {  useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { API_CONFIG, buildApiUrl } from "../config/api";
export const Payment = () => {
  const { seat, store, setStore, setSeat } = useContext(SeatsContext);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();


  const [popUp, setPopUp] = useState(false);
  const buttonPay = useRef<HTMLButtonElement>(null);

  const vipRow = ["D", "E", "F"];

  const totalPrice = seat.reduce((sum, item) => sum + item.price, 0);
  const orderId = `Order_${Date.now().toString() + uuidv4()}`;
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

  const [finalTotal, setFinalTotal] = useState(comboTotal + totalPrice);

  const sharedInfo = seat[0] || {};

  const mergeStore = seat.map((item) => ({
    ...item,
    date: item.date || sharedInfo.date,
    movieTitle: sharedInfo.movieTitle,
    time: sharedInfo.time,
    image: item.image || sharedInfo.image,
    Location: item.Location || sharedInfo.Location,
    city: item.city || sharedInfo.city,
    roomId: item.roomId || sharedInfo.roomId,
    price: finalTotal,
    name: item.name,
  }));

  const [stateMenuVoucher, setStateMenuVoucher] = useState(false);
  const [dataVoucherUser, setDatVoucherUser] = useState<VoucherUser[]>([]);
  const [dataSearch, setDataSearch] = useState<string>("");
  const [membershipTier, setMembershipTier] = useState<TierMember[]>();
  const dataMember = membershipTier?.find((item) => item);

  const [PopupGiaSauKhiGiam, setPopupGiaSauKhiGiam] = useState(false);
  const [toast, setToast] = useState<any>();
  const [DataVoucherSelect, setDataVoucherSelect] = useState({
    code: "",
    giagiam: 0,
    loaiGiam: "",
  });

  useEffect(() => {
    const fetchMembership = async () => {
      if (!isSignedIn) return;
      
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
      const res = await axios.get(
        buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MEMBER_SHIP),
        { headers }
      );
      setMembershipTier(res.data);
    };
    fetchMembership();
  }, [isSignedIn]);

  useEffect(() => {
    const fetchVoucher = async () => {
      if (!isSignedIn) return;
      
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await axios.get(
          `buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_VOUCHER)ByCode?code=${encodeURIComponent(
            dataSearch || ""
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDatVoucherUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVoucher();
  }, [dataSearch, isSignedIn]);

  const FetchUser = async () => {
    if (!isSignedIn) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      await axios.post(
        buildApiUrl(API_CONFIG.BACKEND.CLIENT.UP),
        store,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ Upload store success");
    } catch (error) {
      console.log("❌ Upload error:", error);
    }
  };

  const deleteVoucherAfterUsed = async () => {
    if (!DataVoucherSelect.code || !isSignedIn) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      await axios.post(
        `buildApiUrl(API_CONFIG.BACKEND.CLIENT.USED)?code=${DataVoucherSelect.code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("🗑 Voucher deleted:", DataVoucherSelect.code);
    } catch (error) {
      console.log("❌ Error deleting voucher:", error);
    }
  };

  const successPay = async () => {
    setStore((prev) => [...prev, mergeStore]);
    setPopUp(true);
  };
  useEffect(() => {
    console.log(store)
    if (popUp) {
      const handlePaymentSuccess = async () => {
        await FetchUser();
        await deleteVoucherAfterUsed();

        setTimeout(() => {
          setStore([]);
          setSeat([]);
        }, 2000);
      };
      handlePaymentSuccess();
    }
  }, [popUp]);

  const HandleClickApDung = async (
    code: string,
    price: number,
    loaiGiam: string,
    giagiam: number,
    phamviApDung: string
  ) => {
    try {
      const response = await axios.get(
        buildApiUrl(API_CONFIG.BACKEND.VOUCHER.LAY_GIA_SAU_GIAM),
        {
          params: {
            role: dataMember?.role,
            VoucherCode: code,
            GiaTien: price,
            theaterName: phamviApDung,
          },
        }
      );

      if (typeof response.data === "string") {
        setPopupGiaSauKhiGiam(false);
        setFinalTotal(comboTotal + totalPrice);
        setToast(response.data);
      } else {
        setToast(null);
        setFinalTotal(response.data);
        setStateMenuVoucher(false);
        setPopupGiaSauKhiGiam(true);
        setDataVoucherSelect({ code, giagiam, loaiGiam });
      }
    } catch (error) {
      console.log("❌ Error Apply Voucher:", error);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          buildApiUrl(API_CONFIG.BACKEND.VOUCHER.LAY_GIA_SAU_GIAM),
          {
            params: {
              role: dataMember?.role,
              VoucherCode: "",
              GiaTien: totalPrice,
              theaterName: "",
            },
          }
        );
        setFinalTotal(response.data);
      } catch (error) {
        console.log("❌ Error Apply Voucher:", error);
      }
    };
    fetch();
  }, [membershipTier]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
      <div
        onClick={() => navigate(-1)}
        className="flex flex-row cursor-pointer absolute mt-20 md:pl-30 pl-10 hover:text-pink-600"
      >
        <ArrowBigLeftDashIcon />
        <h1>Back</h1>
      </div>
      {/* Popup Voucher */}
      {stateMenuVoucher && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-2xl bg-black/70">
          {typeof toast === "string" && (
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500`}
            >
              <h1 className="text-red-600 font-bold px-4 py-2 rounded-xl bg-gray-600/20">
                X {toast}
              </h1>
            </div>
          )}

          <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 text-white relative">
            <button
              onClick={() => setStateMenuVoucher(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold mb-4">🎟 Voucher của bạn</h1>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  onChange={(e) => setDataSearch(e.target.value)}
                  type="text"
                  placeholder="Nhập mã voucher..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[--color-brand-cyan] outline-none"
                />
              </div>

              <div className="bg-white/5 rounded-xl p-3 space-y-2">
                <h2 className="font-semibold">Kho voucher</h2>
                <ul className="space-y-1 text-sm text-gray-300">
                  {dataVoucherUser.map((voucher, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-[--color-brand-cyan]">
                          {voucher.code}
                        </span>
                        <span>{voucher.description}</span>
                        <span className="bg-[--color-brand-pink] text-white py-1 rounded text-xs font-semibold">
                          Giảm {voucher.discountAmount}
                          {voucher.loaiGiam === "Value" ? "VND" : "%"}
                        </span>
                        <span>Áp Dụng Tại Khu Vực {voucher.phamViApDung}</span>
                      </div>
                      <button
                        onClick={() =>
                          HandleClickApDung(
                            voucher.code,
                            finalTotal,
                            voucher.loaiGiam,
                            voucher.discountAmount,
                            seat[0]?.name || ""
                          )
                        }
                        className="bg-gray-800 p-3 rounded-2xl cursor-pointer"
                      >
                        Áp Dụng
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-32 pb-16 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full px-6">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            {/* Thông Tin Vé */}
            {seat[0] && (
              <div className="rounded-2xl shadow-xl p-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
                <h2 className="text-2xl font-bold border-b border-white/10 pb-3 mb-4">
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
            <div className="rounded-2xl shadow-xl p-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-3 mb-4">
                🍿 Đồ ăn & Thức uống
              </h2>
              <Food combo={combo} setState={setCombo} combototal={comboTotal} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl shadow-xl p-6 flex flex-col gap-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <InfoCustomer
                setState={setStateMenuVoucher}
                dataVoucher={DataVoucherSelect}
                popupVoucher={PopupGiaSauKhiGiam}
              />
              <OptionPayment
              mergeStore={mergeStore}
                orderId={orderId}
                amount={finalTotal.toString()}
              />
            </div>

            <div className="rounded-2xl shadow-xl p-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-4">
                💰 Thanh Toán
              </h2>
              <span className={`p-2 ${dataMember?.colorTier} rounded-2xl  `}>
                {dataMember?.benefit.slice(0, 1).map((item) => item)}-
                {dataMember?.role}
              </span>
              <p className="text-xl font-semibold mb-6 mt-3">
                Tổng cộng:{" "}
                <span className="text-[--color-brand-pink]">
                  {Number(finalTotal).toLocaleString()} VNĐ
                </span>
              </p>
              <button
                ref={buttonPay}
                className="w-full text-white py-3 text-lg rounded-full font-bold shadow transition bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90"
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
