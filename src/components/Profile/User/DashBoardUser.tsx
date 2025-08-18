import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Calendar, Ticket, Heart, Star, Award, Eye } from "lucide-react";
import { useEffect, useState } from "react";

const membershipTier = {
  current: "Gold",
  points: 2340,
  nextTier: "Platinum",
  pointsNeeded: 660,
  benefits: ["10% discount", "Free popcorn upgrade", "Priority booking"],
};

export const DashBoardUser = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [stats, setStats] = useState({
    watchedMovies: 0,
    tickets: 0,
    points: 0,
    favCinemas: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();

        const [watchedRes, ticketRes, pointRes] = await Promise.all([
          axios.get(
            "https://backendformoviebooking-production.up.railway.app/api/Client/GetQuantityMovieWatchedByUserId",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://backendformoviebooking-production.up.railway.app/api/Client/GetQuantityTIcketBuyByUserId",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://backendformoviebooking-production.up.railway.app/api/Client/GetPointId",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setStats({
          watchedMovies: watchedRes.data ?? 0,
          tickets: ticketRes.data ?? 0,
          points: pointRes.data ?? 0,
          favCinemas: 5, // giả định (bạn có thể fetch từ API khác)
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

      fetchUserData();
  }, [getToken]);

  const dashboard = [
    {
      title: "Phim Đã Xem",
      count: stats.watchedMovies,
      icon: <Eye className="w-5 h-5" />,
      bgColor: "bg-pink-500",
    },
    {
      title: "Tổng Vé Đã Mua",
      count: stats.tickets,
      icon: <Ticket className="w-5 h-5" />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Điểm Tích Lũy",
      count: stats.points,
      icon: <Star className="w-5 h-5" />,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Rạp Phim Yêu Thích",
      count: stats.favCinemas,
      icon: <Heart className="w-5 h-5" />,
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className=" ">
      <div className=" font-bold bg-gradient-to-tr from-transparent via-pink-400 to-cyan-200 text-white p-5 rounded-2xl">
        <div>
          <h1 className="text-2xl">Xin chào, {user?.lastName} 🎬</h1>
          <p className="text-xs">
            Bạn Đang Có 2 Bộ Phim Sắp Chiếu Và 3 Bộ Phim Được Đề Xuất
          </p>
        </div>
        <div className=" flex-row flex gap-3 mt-3">
          <div className=" flex flex-row gap-3 items-center bg-gray-600/50 rounded-2xl p-5">
            <Ticket />
            <h1>BookNow</h1>
          </div>
          <div className=" flex flex-row gap-3 items-center bg-purple-500 rounded-2xl p-5">
            <Calendar />
            <h1>MyBookings</h1>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {dashboard.map((item, index) => (
          <li
            key={index}
            className=" flex flex-row items-center justify-between bg-gray-600/70 p-3 rounded-2xl hover:bg-gray-600 "
          >
            <div className="flex flex-col text-2xs font-bold ">
              <h1>{item.title}</h1>
              <h1>{item.count}</h1>
              </div>
            <div className={`${item.bgColor} p-2 rounded-full`}>
                {item.icon}
              </div>
          </li>
        ))}
      </ul>

      {/* Membership */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 mt-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Membership</h3>
          <Award className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <p className="text-2xl font-bold">{membershipTier.current}</p>
          <p className="text-yellow-100 text-sm">
            {membershipTier.points} points earned
          </p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress to {membershipTier.nextTier}</span>
            <span>{membershipTier.pointsNeeded} points needed</span>
            </div>
          <div className="bg-white bg-opacity-20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 w-3/4"></div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-yellow-100 font-medium">Your Benefits:</p>
            {membershipTier.benefits.map((benefit, i) => (
            <p key={i} className="text-xs text-yellow-100">
              • {benefit}
              </p>
            ))}
          </div>
        </div>

      {/* Suggested Movies */}
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-white">Phim Đề Xuất</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <h2 className="text-lg font-semibold text-white">
                  Bộ Phim {index + 1}
              </h2>
              <p className="text-sm text-gray-300">Mô tả ngắn về bộ phim.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
