import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Calendar, Ticket, Heart, Star, Award, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { PhimDaXem } from "./PhimDaXem";
import { PhimSapChieu } from "./PhimSapChieu";
import type { Movies } from "../../../types/type";
import { useNavigate } from "react-router";

export const DashBoardUser = () => {
  const { user } = useUser();
  const { getToken } = useAuth({ template: "backend-api" });
  const Img_path = "https://image.tmdb.org/t/p/w500";
  const [stats, setStats] = useState({
    watchedMovies: 0,
    tickets: 0,
    points: 0,
    favCinemas: 0,
  });
  const [dataDaXem, setDataDaXem] = useState<Movies[]>([]);
  const [dataSapChieu, setDataSapChieu] = useState<Movies[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken({ template: "aspnet-core" });
        console.log("JWT Token:", token);

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const watchedMoviesRes = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetMovieByUserId",
          { headers }
        );

        const ticketsRes = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetQuantityTIcketBuyByUserId",
          { headers }
        );

        const pointsRes = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetPointId",
          { headers }
        );
        const theaterres = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetRapPhimYeuThichNhat",
          { headers }
        );
        const recommendedMoviesRes = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/MovieNowPlaying/Recommend"
        );
        setRecommendedMovies(recommendedMoviesRes.data);
        const dataPhimDaXem = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetTicketsDaXem",
          { headers }
        );
        setDataDaXem(dataPhimDaXem.data);

        const dataPhimSapChieu = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetTicketsSapChieu",
          { headers }
        );
        setDataSapChieu(dataPhimSapChieu.data);

        setStats({
          watchedMovies: watchedMoviesRes.data ?? 0,
          tickets: ticketsRes.data ?? 0,
          points: pointsRes.data ?? 0,
          favCinemas: theaterres.data ?? 0,
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
      bgColor: "bg-[--color-brand-pink]",
    },
    {
      title: "Tổng Vé Đã Mua",
      count: stats.tickets,
      icon: <Ticket className="w-5 h-5" />,
      bgColor: "bg-[--color-brand-cyan]",
    },
    {
      title: "Điểm Tích Lũy",
      count: stats.points,
      icon: <Star className="w-5 h-5" />,
      bgColor: "bg-pink-400/80",
    },
    {
      title: "Khu Vực Thường Xuyên Đặt",
      count: stats.favCinemas,
      icon: <Heart className="w-5 h-5" />,
      bgColor: "bg-cyan-400/80",
    },
  ];
  const membershipTier = {
    current:
      stats.points < 1000
        ? "Bronze"
        : stats.points < 2000
        ? "Silver"
        : stats.points < 3000
        ? "Gold"
        : stats.points < 4000
        ? "Platinum"
        : stats.points < 5000
        ? "Diamond"
        : "VIP",
    points: stats.points,
    nextTier:
      stats.points < 1000
        ? "Silver"
        : stats.points < 2000
        ? "Gold"
        : stats.points < 3000
        ? "Platinum"
        : stats.points < 4000
        ? "Diamond"
        : stats.points < 5000
        ? "VIP"
        : "VIP",
    pointsNeeded:
      stats.points < 1000
        ? 1000 - stats.points
        : stats.points < 2000
        ? 2000 - stats.points
        : stats.points < 3000
        ? 3000 - stats.points
        : stats.points < 4000
        ? 4000 - stats.points
        : stats.points < 5000
        ? 5000 - stats.points
        : 6000 - stats.points,
    benefits:
      stats.points < 1000
        ? ["5% Giảm Giá", "Miễn Phí Nước Nhỏ"]
        : stats.points < 2000
        ? ["10% Giảm Giá", "Miễn Phí Nâng Cấp Bắp Nước", "Priority booking"]
        : stats.points < 3000
        ? ["15% Giảm Giá", "Miễn Phí Bắp Rang Lớn", "Truy Cập Phòng Chờ VIP"]
        : stats.points < 4000
        ? ["20% Giảm Giá", "Miễn Phí Nước Lớn", "Xem Phim Đặc Biệt"]
        : stats.points < 5000
        ? ["25% Giảm Giá", "Ghế VIP Miễn Phí", "Dịch Vụ Cá Nhân"]
        : ["30% Giảm Giá", "Trải Nghiệm VIP Miễn Phí", "Sự Kiện Đặc Biệt"],
    bgColor:
      stats.points < 1000
        ? "bg-gray-500"
        : stats.points < 2000
        ? "bg-yellow-500"
        : stats.points < 3000
        ? "bg-orange-500"
        : stats.points < 4000
        ? "bg-purple-500"
        : stats.points < 5000
        ? "bg-blue-500"
        : "bg-green-500",
  };
  const percentBar =
    membershipTier.current === "Bronze"
      ? 1000
      : membershipTier.current === "Silver"
      ? 2000
      : membershipTier.current === "Gold"
      ? 3000
      : membershipTier.current === "Platinum"
      ? 4000
      : membershipTier.current === "Diamond"
      ? 5000
      : 6000;

  return (
    <div className=" ">
      <div className="font-bold relative overflow-hidden text-white p-5 rounded-2xl bg-gradient-to-tr from-[--color-brand-pink] via-pink-400 to-[--color-brand-cyan] ring-1 ring-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_80%_120%,rgba(255,255,255,0.15),transparent_40%)]" />
        <div>
          <h1 className="text-2xl">Xin chào, {user?.lastName} 🎬</h1>
          <p className="text-xs">
    
            Bạn Đang Có {dataSapChieu.length<0?"":dataSapChieu.length+" "+"Bộ Phim Sắp Chiếu"} Và {recommendedMovies.length<0?"":recommendedMovies.length+" "+"Bộ Phim Được Đề Xuất"} 
          </p>
        </div>
        <div className=" relative z-[1] flex-row flex gap-3 mt-3">
          <div className=" flex flex-row gap-3 items-center bg-white/15 backdrop-blur rounded-2xl p-5 ring-1 ring-white/10">
            <Ticket />
            <h1>BookNow</h1>
          </div>
          <div className=" flex flex-row gap-3 items-center bg-white/15 backdrop-blur rounded-2xl p-5 ring-1 ring-white/10">
            <Calendar />
            <h1>MyBookings</h1>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {dashboard.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between p-3 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col text-2xs font-bold ">
              <h1>{item.title}</h1>
              <h1>{item.count}</h1>
            </div>
            <div
              className={`${item.bgColor} p-2 rounded-full shadow-lg shadow-black/10`}
            >
              {item.icon}
            </div>
          </li>
        ))}
      </ul>

      {/* Membership */}
      <div
        className={`rounded-2xl p-6 mt-4 text-white ${membershipTier.bgColor} ring-1 ring-white/10`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Membership</h3>
          <Award className="w-5 h-5" />
        </div>
        <div className="mb-4">
          <p className="text-2xl font-bold">{membershipTier.current}</p>
          <p className="text-yellow-100 text-sm">
            {membershipTier.points} Điểm Đã Nhận
          </p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Tiến Độ Tới {membershipTier.nextTier}</span>
            <span>Cần {membershipTier.pointsNeeded} Để Lên Cấp</span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r "
              style={{
                width: `${(stats.points / percentBar) * 100}%`,
                backgroundImage:
                  "linear-gradient(to right, var(--color-brand-pink), var(--color-brand-cyan))",
              }}
            ></div>
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

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-white mb-4">🎬 Phim Đề Xuất</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedMovies.map((movie, index) => (
            <div
              onClick={() => navigate(`/Movies/${movie.original_title}`)}
              key={index}
              className="group flex flex-col bg-white/5 backdrop-blur rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/10"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={Img_path + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>


              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {movie.overview}
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  📅 {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 w-full flex flex-row justify-between  ">
        <PhimDaXem movies={dataDaXem} />
        <PhimSapChieu movies={dataSapChieu} />
      </div>
    </div>
  );
};
