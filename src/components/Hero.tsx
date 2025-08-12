import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { ListMovieByType } from "../services/tmdb";
import { type MovieApi } from "../types/type";
import { HeroSlider } from "./Home Components/HeroSlider";

const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<MovieApi[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [heroTitle, setHeroTitle] = useState<string>("");
  const [heroDescription, setHeroDescription] = useState<string>("");
  const [currentMovieId, setCurrentMovieId] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    ListMovieByType("popular", setHeroMovies, 1);
  }, []);

  // Set initial hero data when movies are loaded
  useEffect(() => {
    if (heroMovies.length > 0 && !backgroundImage) {
      const firstMovie = heroMovies[0];
      setBackgroundImage(`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`);
      setHeroTitle(firstMovie.original_title);
      setHeroDescription(firstMovie.overview || "");
      setCurrentMovieId(firstMovie.id);
    }
  }, [heroMovies, backgroundImage]);

  const handleMovieChange = useCallback(
    (image: string, description: string, title: string, id: number) => {
      setBackgroundImage(image);
      setHeroTitle(title);
      setHeroDescription(description);
      setCurrentMovieId(id);
      console.log(currentMovieId)
    },
    []
  );

  // Show loading state if no movies loaded yet
  if (heroMovies.length === 0) {
    return (
      <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

      {/* Nội dung trái */}
      <div className="absolute md:top-1/4 top-80  md:left-20  z-10  md:w-[30%]  text-white space-y-2 md:space-y-6 backdrop-blur-md bg-black/40 p-8 rounded-2xl shadow-2xl">
        <h1 className="md:text-5xl text-2xl font-extrabold leading-tight drop-shadow-md">{heroTitle}</h1>

        <div className="flex gap-3">
          <span className="px-3 py-1 bg-red-500 text-sm rounded-2xl">Hành Động</span>
          <span className="px-3 py-1 bg-yellow-400 text-black text-sm rounded-2xl">Hot Hit 2024!</span>
          <span className="px-3 py-1 bg-white text-black text-sm rounded-2xl">2H 43P</span>
        </div>

        <p className="text-sm  leading-relaxed opacity-90">{heroDescription}</p>

        <button
          onClick={() => navigate(`/Movies/${heroTitle}`)}
          className="bg-red-600 hover:bg-red-700 transition-all md:px-6 md:py-3 px-3 py-2 rounded-xl text-white font-semibold shadow-lg"
        >
          🎟️ Đặt Vé Ngay
        </button>
      </div>
      <div className="absolute md:bottom-30 bottom-10 max-sm:left-5 md:right-10  w-[500px] max-w-[90%] z-10">
        <HeroSlider movie={heroMovies} onChange={handleMovieChange} />
      </div>
    </div>
  );
};

export default Hero;