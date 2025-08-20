import { useNavigate } from "react-router";
import type { MovieCards } from "../../types/type";

export const MovieCard: React.FC<MovieCards> = ({ id, poster_pathh, original_tittle,size }) => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w500";
  const navigate=useNavigate();

  return (
    <div
    onClick={()=>{navigate(`/Movies/${original_tittle}`)}}
      className={`relative w-[350px] h-[${size}px] rounded-xl overflow-hidden shadow-lg group`}
    >
      <img
        src={IMG_PATH + poster_pathh}
        alt={original_tittle}
        className="w-full h-full object-cover transform duration-300 group-hover:scale-105"
      />
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      {/* Nội dung nổi lên trên ảnh */}
      <div className="absolute bottom-0 p-10 text-white z-10">
        <h2 className="text-3xl font-bold">{original_tittle}</h2>
        <p className="text-sm text-gray-300">Mã phim: {id}</p>
        <button  className="mt-2 cursor-pointer px-4 py-1 rounded text-sm text-white bg-gradient-to-r" style={{ backgroundImage: "linear-gradient(to right, var(--color-brand-pink), var(--color-brand-cyan))" }} hover:opacity-90>
          Đặt vé Ngay
        </button>
      </div>
    </div>
  );
};
