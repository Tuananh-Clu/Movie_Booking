import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SeatsContext } from "../config/filterSeat";

export const KetQuaThongBaoThanhToan = () => {
  const { orderid, method, status } = useParams();
  const { getToken } = useAuth();
  const { store, setStore } = useContext(SeatsContext);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    const [times,setTimes]=useState(3)

  const upTicket = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/Up",
        store,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Upload thành công");
      console.log(store)
    } catch (error) {
      console.log("❌ Lỗi upload:", error);
            console.log(store)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!orderid || !method || !status) {
      navigate("/");
      return;
    }

    let timeoutId:any;
  
    if (status === "success") {
      upTicket();
      timeoutId = setTimeout(() => {
        navigate("/");
      }, 3000);

    } else {
      navigate("/");
      setStore([]);
    }
   
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [status, orderid, method, navigate, setStore]);
    useEffect(() => {
    if (status !== "success") return;

    const intervalId = setInterval(() => {
      setTimes((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">Kết quả Thanh toán</h2>
        <p className="mb-1">Mã đơn hàng: {orderid}</p>
        <p className="mb-1">Phương thức: {method?.toUpperCase()}</p>
        
        {status === "success" ? (
          <div>
            <p className="text-green-600 font-bold text-lg mb-2">
              ✅ Thanh toán thành công
            </p>
            {isLoading && (
              <p className="text-blue-500 text-sm">Đang xử lý đơn hàng...</p>
            )}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            {!isLoading && !error && (
              <p className="text-gray-500 text-sm">
                {`Tự động chuyển về trang chủ sau ${times} giây...`}
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-red-600 font-bold text-lg">
              ❌ Thanh toán thất bại
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Đang chuyển về trang chủ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};