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
    <div>
        <h2 className="text-xl font-bold text-white">Danh Sách Phim Yêu Thích</h2>
        <ul>
          {movies.map((movie) => {
            return(
              <li key={movie.id} className="py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <img src={IMG_PATH+movie.poster} alt={movie.title} className="w-16 h-16 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
    </div>
  )
}
