import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import type { MovieApi, Movies } from "../types/type";
import { ListMovieByType } from "../services/tmdb";
import { Navbar } from "../components/Navbar";
import { Actors } from "../components/Moviesinformation Components/Actors";
import { DaySelect } from "../components/Moviesinformation Components/DaySelect";
import { Recommend } from "../components/Moviesinformation Components/Recommend";
import { Footer } from "../components/Footer";
import axios from "axios";
import { BookingContext } from "../config/BookingContext";

export const MoviesInformation = () => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const { id } = useParams<string>() || {};
const {setFavoriteMovies}=useContext(BookingContext);
  const [MainMovies, setMainMovies] = useState<MovieApi[]>([]);
  const [ComingSoon, setComingSoon] = useState<MovieApi[]>([]);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  
  const [toggleFavorite, setToggleFavorite] = useState(false);
  
  const isLoading = !(posterLoaded && backgroundLoaded);
  const daySelect = useRef<HTMLDivElement | null>(null);
  const fetchDataManyPage = async () => {
    try{
      const response=await axios.get("https://backendformoviebooking-1.onrender.com/api/StorageMovie/ShowAll");
      setMainMovies(response.data);
    }
    catch(error){
      console.log(error)
    }
  };
  const handleToggleFavorite = (movie: MovieApi) => {
    const movieData: Movies = {
      id: String(movie.id),
      title: movie.original_title,
      poster: movie.poster_path,
      duration: movie.vote_count,
    };
  
    if (toggleFavorite) {
      setFavoriteMovies((prev) => prev.filter((item) => String(item.id) !== String(movie.id)));
      setToggleFavorite(false);
    } else {
      setFavoriteMovies((prev) => [...prev, movieData]);
      setToggleFavorite(true);
    }
  };
  useEffect(() => {
    fetchDataManyPage();
    ListMovieByType("upcoming", setComingSoon, 1);
  }, []);

  const movieFromNowPlaying = MainMovies.find(
    (item) => item.original_title.toString() === id
  );
  const movieFromComingSoon = ComingSoon.find(
    (item) => item.original_title.toString() === id
  );
  const movie = movieFromNowPlaying || movieFromComingSoon;

  return (
    <>
      <Navbar />

      {isLoading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="w-14 h-14 border-4 border-gray-100 border-t-red-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Preload image */}
      {movie && (
        <img
          src={IMG_PATH + movie.backdrop_path}
          onLoad={() => setBackgroundLoaded(true)}
          alt="preload"
          className="hidden"
        />
      )}

      {movie && (
        <>
          <div
            style={{
              backgroundImage: `url(${IMG_PATH}${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="md:w-full max-sm:max-w-[500px] bg-cover object-center h-screen relative shadow-inner"
          />
          <div className="absolute bottom-0 left-0 w-full flex items-start md:px-40 px-10 pb-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="md:w-[180px] md:h-[300px] rounded-xl overflow-hidden shadow-lg border border-white/10">
              <img
                src={IMG_PATH + movie.poster_path}
                alt={movie.original_title}
                className="w-full h-full object-cover"
                onLoad={() => setPosterLoaded(true)}
              />
            </div>

            {/* Info */}
            <div className="ml-6 text-white max-w-xl">
              <h1 className="md:text-5xl text-3xl font-bold leading-snug drop-shadow-md">
                {movie.original_title}
              </h1>

              <p className="mt-4 text-gray-200 text-base line-clamp-4 leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex flex-col gap-3 mt-6 text-sm sm:text-base">
                <p>
                  <strong>Ngày Ra Mắt:</strong> {movie.release_date}
                </p>

                <p className="flex items-center gap-2">
                  <i className="fa-solid fa-heart text-red-500" />
                  {movie.vote_average}
                </p>
                <div className="flex flex-row items-center gap-4">
                   <button
                  onClick={() => {
                    daySelect.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className="mt-2 bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-6 w-fit rounded-2xl font-semibold"
                >
                  Đặt Vé Ngay
                </button>
                <i onClick={() => {
                  if (movie) {
                   handleToggleFavorite(movie);
                  }
                }} className={`fa-solid fa-heart fa-xl ${toggleFavorite?"text-red-600":"text-white"}  rounded-2xl p-4`}></i>

                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Các section phụ */}
      <div className="relative z-10 ">
      <div className="mt-32 px-10 md:px-10">
                <Actors movieName={String(id)} />
      </div>
        <div ref={daySelect} className="mt-60 scroll-px-40 w-full ">
          <DaySelect title={id} />
        </div>
        <Recommend />
        <div className="mt-32">
          <Footer />
        </div>
      </div>
    </>
  );
};
