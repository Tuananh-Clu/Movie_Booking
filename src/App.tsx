import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { MoviesInformation } from "./Pages/MoviesInformation";
import { Theater } from "./Pages/Theater";
import { ScrollToTop } from "./components/ScrollToTop";
import { InfoTheater } from "./Pages/InfoTheater";
import { Seats } from "./Pages/Seats";
import { Payment } from "./Pages/Payment";
import { useEffect } from "react";
import { useAuth, useUser } from "./config/AuthContext";
import axios from "axios";
import "./index.css";
import { Ticket } from "./Pages/Ticket";
import { News } from "./Pages/News";
import { Profile } from "./Pages/Profile";
import { KhoVoucher } from "./Pages/KhoVoucher";
import { GialapThanhToan } from "./Pages/GialapThanhToan";
import { KetQuaThongBaoThanhToan } from "./Pages/KetQuaThongBaoThanhToan";
import { buildApiUrl, API_CONFIG } from "./config/api";

function App() {
  const { isSignedIn,user } = useUser();
  const { user: authUser } = useAuth();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !authUser) return;
    
    const body = {
      Id: authUser.id,
      Email: authUser.email,
      Name: authUser.name,
      Avatar: authUser.avatar || "",
      role: authUser.name?.includes("A") ? "Admin" : "User",
      password:user?.password,
      point: 0,
      tickets: [],
      yeuThich: [],
      voucherCuaBan: [],
      tier: ""
    };
    console.log("👉 Gửi body:", body);
    await axios.post(buildApiUrl(API_CONFIG.BACKEND.CLIENT.ADD_USER), body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (isSignedIn && authUser) {
      fetchUser();
      console.log("Gui thanh cong");
    }
  }, [isSignedIn, authUser]);

  const fetchDataDelete = async () => {
    await axios.delete(buildApiUrl(API_CONFIG.BACKEND.CINEMA.DELETE_SHOW_TIME_OLD), {});
  };
  
  useEffect(() => {
    fetchDataDelete();
  }, []);
  
  window.addEventListener("offline", () => {
    alert("Ban Dang Offline")
  })
  window.addEventListener("online", () => {
    alert("Chao Mung Ban Quay Tro Lai")
  })

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Movies/:id" element={<MoviesInformation />} />
        <Route path="/Theater" element={<Theater />} />
        <Route path="/Theater/:id" element={<InfoTheater />} />
        <Route path="/Theater/:room/:title" element={<Seats />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Tickets" element={<Ticket />} />
        <Route path="/News" element={<News />} />
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/Voucher" element={<KhoVoucher/>}/>
        <Route path="/Payment/:orderid/:amount/:status/:method" element={<GialapThanhToan/>} />
        <Route path="/Result/:orderid/:amount/:status/:method" element={<KetQuaThongBaoThanhToan/>}/>
      </Routes>
    </>
  );
}

export default App;
