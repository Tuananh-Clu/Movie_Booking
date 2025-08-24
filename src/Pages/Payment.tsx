import { useContext, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SeatsContext } from "../config/filterSeat";
import { LoadingSuccess } from "../components/PaymentComponents/LoadingSuccess";
import { OptionPayment } from "../components/PaymentComponents/OptionPayment";
import { InfoCustomer } from "../components/PaymentComponents/InfoCustomer";
import { Food } from "../components/PaymentComponents/Food";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import type { VoucherUser } from "../types/type";

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
  const [finalTotal,setFinalTotal]=useState(comboTotal+totalPrice)
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
    price:finalTotal,
    name:item.name
  }));
  const [stateMenuVoucher, setStateMenuVoucher] = useState(false);
  useEffect(() => {
    console.log(stateMenuVoucher);
  }, [setStateMenuVoucher]);
  const FetchUser = async () => {
    try {
      const token = await getToken();
      console.log(token);
      const response = await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/Up",
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

  const deleteVocherAfterUsed=async()=>{
     const token=await getToken();
     await axios.post(
        `https://backendformoviebooking-production.up.railway.app/api/Client/Used?code=${DataVoucherSelect.code}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
        
      );
      console.log(DataVoucherSelect.code)
  }
  const successPay = async () => {
   
    setStore((prev) => [...prev, [...mergeStore]]);
    setPopUp(true);
  };
  useEffect(() => {
    FetchUser();
    deleteVocherAfterUsed()
  }, [successPay]);
  useEffect(() => {
    if (popUp) {
      setTimeout(() => {
        setStore([]);
        setSeat([]);
      }, 2000);
    }
  }, [popUp]);
  const [dataVoucherUser,setDatVoucherUser]=useState<VoucherUser[]>([]);
  const [dataSearch,setDataSearch]=useState<string>("");
  useEffect(()=>{

    const fetch=async()=>{
      const datas=dataSearch?.length==0?"":dataSearch
      try {
        const token=await getToken();
       const response= await axios.get(`https://backendformoviebooking-production.up.railway.app/api/Client/GetVoucherByCode?code=${encodeURIComponent(datas as any)}`,{
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        setDatVoucherUser(response.data)
        console.log(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetch()
  },[dataSearch])
  const [PopupGiaSauKhiGiam,setPopupGiaSauKhiGiam]=useState(false);
  const [DataVoucherSelect,setDataVoucherSelect]=useState({
    code:"",
    giagiam:0,
    loaiGiam:""
  })
  const HandleClickApDung = async (
  code: string,
  price: number,
  loaiGiam: string,
  giagiam: number,
  phamviApDung: string
) => {
  try {
    const response = await axios.get(
      "https://backendformoviebooking-production.up.railway.app/api/Voucher/LayGiaSauGiam",
      {
        params: {
          VoucherCode: code ?? "",
          GiaTien: price ?? 0,
          theaterName: encodeURIComponent(phamviApDung) ?? "", 
        },
      }
    );

    console.log("👉 URL đã gửi:", response.request?.responseURL);
    console.log("👉 Data trả về:", response.data);

    setFinalTotal(response.data);
    setStateMenuVoucher(false);
    setPopupGiaSauKhiGiam(true);
    setDataVoucherSelect({
      code,
      giagiam,
      loaiGiam,
    });
  } catch (error) {
    console.log("❌ Error Apply Voucher:", error);
  }
};


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
      {stateMenuVoucher && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-2xl bg-black/70">
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
                onChange={(e)=>setDataSearch(e.target.value)}
                  type="text"
                  placeholder="Nhập mã voucher..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-[--color-brand-cyan] outline-none"
                />
                <button className="bg-[--color-brand-cyan] hover:opacity-90 px-4 py-2 rounded-xl font-semibold">
                  Áp dụng
                </button>
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
                        <span className="font-bold text-[--color-brand-cyan]">{voucher.code}</span>
                        <span className="">{voucher.description}</span>
                         <span className="bg-[--color-brand-pink] text-white  py-1 rounded text-xs font-semibold">
                        Giảm {voucher.discountAmount}{voucher.loaiGiam=="Value"?"VND":"%"}
                      </span>
                      </div>
                     <h1>{voucher.phamViApDung}</h1>
                      <button onClick={()=>HandleClickApDung(voucher.code,finalTotal,voucher.loaiGiam,voucher.discountAmount,seat[0].name)} className="bg-gray-800 p-3 rounded-2xl cursor-pointer">Áp Dụng</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-32 pb-16 flex justify-center z-0 ">
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full px-6">
          {/* LEFT */}
          <div className="md:col-span-1 flex flex-col gap-6">
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
            <div className="rounded-2xl shadow-xl p-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-3 mb-4">
                🍿 Đồ ăn & Thức uống
              </h2>
              <Food combo={combo} setState={setCombo} combototal={comboTotal} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl shadow-xl p-6 flex flex-col gap-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <div className="w-full">
                <InfoCustomer setState={setStateMenuVoucher} dataVoucher={DataVoucherSelect} popupVoucher={PopupGiaSauKhiGiam} />
              </div>
              <div className="mt-6">
                <OptionPayment />
              </div>
            </div>

            <div className="rounded-2xl shadow-xl p-6 bg-white/5 backdrop-blur ring-1 ring-white/10">
              <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-4">
                💰 Thanh Toán
              </h2>
              <p className="text-xl font-semibold mb-4">
                Tổng cộng:{" "}
                <span className="text-[--color-brand-pink]">
                  {finalTotal.toLocaleString()} VNĐ
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
