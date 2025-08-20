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
      <div className="flex flex-col items-center p-10 rounded-3xl shadow-lg text-white bg-white/5 backdrop-blur ring-1 ring-white/10">
        <h1 className="text-[--color-brand-cyan] text-2xl font-bold mb-6">🎉 Thanh Toán Thành Công!</h1>
        {animation && (
          <Lottie
            animationData={animation}
            loop={false}
            autoplay
            style={{ width: 300, height: 300 }}
          />
        )}
        <button onClick={()=>navigate("/Tickets")} className="mt-6 font-semibold px-6 py-3 rounded-2xl shadow text-white bg-gradient-to-r from-[--color-brand-pink] to-[--color-brand-cyan] hover:opacity-90">
          Xem Vé Tại Đây
        </button>
         <button
          onClick={() => navigate("/")} // Về Trang chủ
          className="mt-4 text-gray-300 underline hover:text-white transition-colors"
        >
          ⬅️ Quay Trở Lại Trang Chủ
        </button>
      </div>
    </div>
  );
};
