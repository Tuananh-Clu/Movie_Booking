import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { type MovieApi } from "../types/type";
import { MoviesSlider } from "../components/Home Components/MoviesSlider";
import { Trailer } from "../components/Trailer";
import { Footer } from "../components/Footer";
import axios from 'axios';
export const Home = () => {
  const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
  const [moviesUpcoming,setMoviesUpcoming]=useState<MovieApi[]>([])
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

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://backendformoviebooking-1.onrender.com/api/MovieUpcoming/Show");
      setMoviesUpcoming(response.data)
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  fetchData();
}, []);

  return (
    <div className="h-auto">
      <Navbar />
      <Hero />
      {/*Phim Dang Chieu*/}
      <MoviesSlider title="Phim Đang Chiếu Tại Rạp" movies={moviesPlaying}/>
      {/** Phim Sap Chieu */}
      <MoviesSlider title="Coming Soon" movies={moviesUpcoming}/>
      <Trailer id="" img=""/>
      <Footer/>
    </div>
  );
};
