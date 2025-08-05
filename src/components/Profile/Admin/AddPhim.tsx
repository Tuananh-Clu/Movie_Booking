import axios from 'axios';
import { useEffect, useState } from "react";
import { type MovieApi } from "../../../types/type";
export const AddPhim = () => {
    const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
    const IMG_PATH = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://backendformoviebooking-1.onrender.com/api/MovieNowPlaying/Show");
      setMoviesPlaying(response.data); 
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  fetchData();
}, []);

  return (
    <div>
      <h1>Phim Đang Chiếu</h1>
      <div className='flex flex-row overflow-x-hidden hide-scrollbar'>
        {moviesPlaying.map((item)=>{
          return(
            <div>
              <img className='w-70 h-70' src={IMG_PATH+item.poster_path} alt="" />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}
