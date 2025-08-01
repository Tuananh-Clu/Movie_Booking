import { useEffect, useState } from "react";
import { type MovieApi } from "../../types/type";
import { MovieCard } from "../Home Components/MovieCard";
import axios from "axios";

export const Recommend = () => {
  const [currentMovies, setCurrentMovies] = useState<MovieApi[]>([]);
  const [more,setMore]=useState(4);
  const onClick=()=>{
    setMore(more+10)
  }

 const fetchDataManyPage = async () => {
try{
  const response=await axios("https://backendformoviebooking-1.onrender.com/api/StorageMovie/ShowAll")
 setCurrentMovies(response.data);
}
catch{
  console.log("Error");
}
   
  };
  useEffect(() => {
    fetchDataManyPage();
  }, []);
  return (
    <div className="mt-40 px-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-6 border-l-4 border-red-500 pl-4">
        🎬 Gợi Ý Có Thể Bạn Thích
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentMovies.slice(0, more).map((item) => (
          <div key={item.id} className="transform hover:scale-105 transition duration-300">
            <MovieCard
              id={item.id}
              poster_pathh={item.poster_path}
              original_tittle={item.original_title}
              size={0}
            />
          </div>
        ))}
      </div>
      <button className="mt-20 bg-blue-500 rounded-2xl p-3  text-white cursor-pointer" onClick={()=>onClick()}>Xem Thêm</button>
    </div>
  );
};
