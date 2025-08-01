import { useContext, useEffect, useState } from "react";
import type { items } from "../../types/type";
import { NewContext } from "../../config/new";
import axios from "axios";

export const MainArticle = () => {
  const [article, setArticle] = useState<items[]>([]);
  const { SelectArticle } = useContext(NewContext);

  const fetchAllMovieNews = async () => {
    try {
      const response = await axios("https://backendformoviebooking-1.onrender.com/api/Article/Show");
      setArticle(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMovieNews();
  }, []);

  // Fallback lấy bài đầu tiên nếu SelectArticle không có ảnh hợp lệ
  const displayArticle = SelectArticle?.enclosure?.link
    ? SelectArticle
    : article[0];

  return (
    <div className="rounded-2xl">
      {displayArticle && (
        <div className="rounded-2xl flex flex-col items-center">
          <div className="rounded-2xl bg-cover overflow-hidden">
            <img
              className="h-[420px] w-full object-cover rounded-2xl"
              src={displayArticle.enclosure?.link || "/fallback.jpg"}
              alt={displayArticle.title}
              onError={(e) => {
                e.currentTarget.src = "/fallback.jpg";
              }}
            />
          </div>
          <h1 className="font-bold text-2xl mt-4">{displayArticle.title}</h1>
          <div className="mt-2">
            <h2>Categories: {displayArticle.categories}</h2>
            <div
              className="text-sm mt-4"
              dangerouslySetInnerHTML={{ __html: displayArticle.content }}
            />
          </div>
          <button className="mt-6 bg-red-400 text-white px-4 py-2 rounded-2xl">
            <a href={displayArticle.link} target="_blank" rel="noopener noreferrer">
              Đọc Thêm
            </a>
          </button>
        </div>
      )}
    </div>
  );
};
