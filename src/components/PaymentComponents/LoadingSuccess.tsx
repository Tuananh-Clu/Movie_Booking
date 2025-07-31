import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";

export const LoadingSuccess = () => {

  const [animation, setAnimation] = useState<any>(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://assets4.lottiefiles.com/packages/lf20_jbrw3hcz.json");
      const data = await response.json();
      setAnimation(data);
    };
    fetchData();
  }, []);

 
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black/80 z-50">
      <div className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-lg">
        <h1 className="text-green-600 text-2xl font-bold mb-6">🎉 Thanh Toán Thành Công!</h1>
        {animation && (
          <Lottie
            animationData={animation}
            loop={false}
            autoplay
            style={{ width: 300, height: 300 }}
          />
        )}
        <button onClick={()=>navigate("/Tickets")} className="mt-6 bg-red-500 hover:bg-red-600 transition-colors text-white font-semibold px-6 py-3 rounded-2xl shadow">
          Xem Vé Tại Đây
        </button>
         <button
          onClick={() => navigate("/")} // Về Trang chủ
          className="mt-4 text-gray-700 underline hover:text-black transition-colors"
        >
          ⬅️ Quay Trở Lại Trang Chủ
        </button>
      </div>
    </div>
  );
};
