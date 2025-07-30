import { useEffect, useState } from "react";
import type { MovieApi } from "../../types/type";
import { ListMovieByType } from "../../services/tmdb";
import { useNavigate } from "react-router";
import axios from "axios";

export const Search = () => {
  const [movie, setMovie] = useState<MovieApi[]>([]);
  const [valueSearch, setValueSearch] = useState("");
  const [movies, setMovies] = useState<MovieApi[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    ListMovieByType("now_playing", setMovie, 1);
    console.log(movie);
  }, []);

  const IMG_PATH = "https://image.tmdb.org/t/p/original";
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7083/api/StorageMovie/ShowAll"
      );
      setMovies(response.data);
    } catch (error) {
      console.log("Call Api Loi");
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const filterValueSearch = movies.filter((item) =>
    item.original_title.toLowerCase().includes(valueSearch.toLowerCase())
  );

  return (
    <div className="fixed top-20 right-15 md:right-20 flex flex-col gap-2 w-96  z-50">
      {/* Search Input */}
      <div className="bg-gray-900/70 px-3 py-2 rounded-2xl shadow-md">
        <input
          placeholder="🔍 Nhập tên phim..."
          className="border-none outline-none w-full bg-transparent text-white placeholder-gray-400"
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
          type="text"
        />
      </div>

      {/* Search Results */}
      <div
        className="overflow-y-auto h-[400px] hide-scrollbar scroll-smooth bg-gray-900 rounded-2xl text-white custom-scroll"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        {filterValueSearch.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {filterValueSearch.map((item) => (
              <li
                onClick={() => navigate(`/Movies/${item.original_title}`)}
                key={item.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-800 transition"
              >
                <img
                  loading="lazy"
                  className="w-16 h-24 object-cover rounded-lg"
                  src={IMG_PATH + item.poster_path}
                  alt={item.original_title}
                />
                <div>
                  <h1 className="text-base font-medium">
                    {item.original_title}
                  </h1>
                  <p className="text-sm text-gray-400">{item.release_date}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-3 text-center text-gray-400">Không có phim nào</div>
        )}
      </div>
    </div>
  );
};
