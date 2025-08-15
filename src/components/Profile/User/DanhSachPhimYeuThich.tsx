import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
import {  useEffect, useState } from "react"
import type { Movies } from "../../../types/type";


export const DanhSachPhimYeuThich = () => {
  const {getToken}=useAuth();
   const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const [movies, setMovies] = useState<Movies[]>([]);
  useEffect(()=>{
    const fetchData = async () => {
      try{
         const token=await getToken();
        const response=await axios.get("https://backendformoviebooking-production.up.railway.app/api/Client/GetFavouriteMovieByUser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
        console.log(response.data);
      }
      catch (error) {
        console.log("Error fetching favourite movies:", error);
      }
    }
    fetchData();
  },[])
    return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Danh Sách Phim Yêu Thích</h2>
      
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Bạn chưa có phim yêu thích nào</p>
          <p className="text-gray-500 mt-2">Hãy thêm một số phim vào danh sách yêu thích của bạn!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={IMG_PATH+movie.poster}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-3 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
