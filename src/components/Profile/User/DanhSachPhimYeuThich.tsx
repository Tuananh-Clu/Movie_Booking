import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Movies } from "../../../types/type";

export const DanhSachPhimYeuThich = () => {
  const { getToken } = useAuth();
  const [Edit, setEdit] = useState(false);
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const [movies, setMovies] = useState<Movies[]>([]);
  const handleClickDelete = async (movieId: string) => {
    try {
      const token = await getToken();
      await axios.delete(
        `https://backendformoviebooking-production.up.railway.app/api/Client/DeleteUserFavorite?movieTitle=${encodeURIComponent(
          movieId
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error deleting favourite movie:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Client/GetFavouriteMovieByUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching favourite movies:", error);
      }
    };
    fetchData();
  }, [Edit]);

  return (
    <div className="p-4">
      <div className="flex flex-row items-center w-full  justify-between ">
        <h2 className="text-2xl font-bold text-white mb-6">
          Danh Sách Phim Yêu Thích
        </h2>
        {Edit ? (
          <button
            onClick={() => setEdit(false)}
            className="bg-red-500 mb-6 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        ) : (
          <i
            onClick={() => setEdit(!Edit)}
            className="fa-solid fa-xl fa-pen-to-square mb-6 text-white"
          ></i>
        )}
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Bạn chưa có phim yêu thích nào
          </p>
          <p className="text-gray-500 mt-2">
            Hãy thêm một số phim vào danh sách yêu thích của bạn!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie, key) => (
            <div
              key={key}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={IMG_PATH + movie.poster}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-3 w-full transform translate-y-full flex flex-row justify-between  group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {movie.title}
                    </h3>
                    <h3>
                      {Edit ? (
                        <i
                          onClick={() => handleClickDelete(movie.title)}
                          className="fa-solid fa-xs  text-red-500 fa-trash-can p-2 rounded-2xl bg-gray-500"
                        ></i>
                      ) : null}
                    </h3>
                  </div>
                </div>

                {/* Rating or year overlay */}
                {movie.duration && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    ⭐ {movie.duration.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
