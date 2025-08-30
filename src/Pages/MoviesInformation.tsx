import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import type {  MovieApi, Movies } from "../types/type";
import { ListMovieByType } from "../services/tmdb";
import { Navbar } from "../components/Navbar";
import { Actors } from "../components/Moviesinformation Components/Actors";
import { DaySelect } from "../components/Moviesinformation Components/DaySelect";
import { Recommend } from "../components/Moviesinformation Components/Recommend";
import { Footer } from "../components/Footer";
import axios from "axios";
import { BookingContext } from "../config/BookingContext";
import { useAuth } from "../config/AuthContext";
import { Heart, Loader2 } from "lucide-react";
import { API_CONFIG, buildApiUrl } from "../config/api";

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
      const response=await axios.get(buildApiUrl(API_CONFIG.BACKEND.STORAGE_MOVIE.SHOW_ALL));
      setMainMovies(response.data);
    }
    catch(error){
      console.log(error)
    }
  };
  
  useEffect(() => {
    fetchDataManyPage();
    ListMovieByType("upcoming", setComingSoon, 1);
  }, []);
  
  const handleToggleFavorite =async (movie: MovieApi) => {
    const movieData: Movies = {
      id: String(movie.id),
      title: movie.original_title,
      poster: movie.poster_path,
      duration: Math.round(movie.vote_average),
    };
  
    if (toggleFavorite) {
      setFavoriteMovies((prev) => prev.filter((item) => String(item.id) !== String(movieData.id)));
      setToggleFavorite(false);
    } else {
      setFavoriteMovies((prev) => [...prev, movieData]);
      setToast(true)
      setToggleFavorite(true);
    }
    console.log("Toggle favorite for movie:", movieData);
  }
  
  useEffect(()=>{
    setTimeout(() => {
      setToast(false)
    }, 3000);
  },[handleToggleFavorite])
  
  const [toast,setToast]=useState(false);
  const { isSignedIn } = useAuth();
  const [movies, setMovies] = useState<Movies[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!isSignedIn) return;
      
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVOURITE_MOVIE_BY_USER), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.log("Error fetching favourite movies:", error);
      }
    }
    fetchData();
  }, [isSignedIn])

  const movieFromNowPlaying = MainMovies.find(
    (item) => item.original_title.toString() === id
  );
  const movieFromComingSoon = ComingSoon.find(
    (item) => item.original_title.toString() === id
  );
  const movie = movieFromNowPlaying || movieFromComingSoon;
  const poster=IMG_PATH+movie?.backdrop_path;
  const isFavourite=movie?
  movies.some((item) => item.title.trim().toLowerCase() === movie.original_title.trim().toLowerCase()):false;
  
  useEffect(() => {
    if(movie&&movies.length>0){
      setToggleFavorite(isFavourite);
    }
  }, [movie, movies]);

  // Preload images for better performance
  useEffect(() => {
    if (movie) {
      // Preload poster
      const posterImg = new Image();
      posterImg.src = IMG_PATH + movie.poster_path;
      posterImg.onload = () => setPosterLoaded(true);
      
      // Preload background
      const bgImg = new Image();
      bgImg.src = IMG_PATH + movie.backdrop_path;
      bgImg.onload = () => setBackgroundLoaded(true);
    }
  }, [movie]);

  return (
    <>
      <Navbar />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-white mx-auto mb-4" />
            <p className="text-white text-lg">Đang tải thông tin phim...</p>
          </div>
        </div>
      )}
      
      {/* Toast notification */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 top-20 p-3 flex flex-row text-white bg-gray-600/80 rounded-2xl gap-2 z-50 animate-fade-in">
          <Heart className="text-red-400"/>
          <h1>Đã Thêm Vào Danh Sách Yêu Thích</h1>
        </div>
      )}

      {movie && (
        <>
          {/* Background Image with loading optimization */}
          <div
            style={{
              backgroundImage: backgroundLoaded ? `url(${poster})` : 'none',
              backgroundColor: backgroundLoaded ? 'transparent' : '#1a1a1a',
            }}
            className="md:w-full max-sm:max-w-[600px] bg-cover bg-center h-screen relative shadow-inner transition-all duration-500"
          >
            {/* Background loading placeholder */}
            {!backgroundLoaded && (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
              </div>
            )}
          </div>
          
          {/* Movie Info Section */}
          <div className="absolute bottom-0 left-0 w-full flex items-start md:px-40 px-10 pb-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            {/* Poster with loading optimization */}
            <div className="md:w-[180px] md:h-[300px] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-gray-800">
              {posterLoaded ? (
                <img
                  src={IMG_PATH + movie.poster_path}
                  alt={movie.original_title}
                  className="md:w-full w-[750px] h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
              )}
            </div>

            {/* Movie Information */}
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
                  <i className="fa-solid fa-heart text-red-400" />
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
                    className="mt-2 transition-colors text-white py-2 px-6 w-fit rounded-2xl font-semibold hover:opacity-90"
                    style={{ backgroundImage: "linear-gradient(to right, var(--color-brand-pink), var(--color-brand-cyan))" }}
                  >
                    Đặt Vé Ngay
                  </button>
                  
                  <button
                    onClick={() => {
                      if (movie) {
                        handleToggleFavorite(movie);
                      }
                    }}
                    className={`fa-solid fa-heart fa-xl rounded-2xl p-4 transition-colors ${
                      toggleFavorite || isFavourite ? "text-red-500" : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Additional Sections */}
      <div className="relative z-10 bg-gradient-to-br from-black via-neutral-900 to-black">
        <div className="pt-32 px-10 md:px-10">
          <Actors movieName={String(id)} />
        </div>
        
        <div ref={daySelect} className="mt-60 scroll-px-40 w-full">
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
