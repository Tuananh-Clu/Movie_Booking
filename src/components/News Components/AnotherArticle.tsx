import { useContext, useEffect, useState } from "react";
import type { items } from "../../types/type";

import { NewContext } from "../../config/new";
import axios from "axios";

export const AnotherArticle = () => {
  const [article, setArticle] = useState<items[]>([]);
  const { setSelectArticle } = useContext(NewContext);
 const fetchAllMovieNews=async()=>{
    try{
      const response=await axios("https://localhost:7083/api/Article/Show")
      setArticle(response.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAllMovieNews()
  }, []);
  const handleClick = (item:items) => {
    setSelectArticle(item);
  };
  return (
    <div className="">
      <div className=" flex flex-col  h-[600px] hide-scrollbar overflow-y-auto gap-4">
        {article.slice(1, 20).map((item, idx) => {
          return (
            <div
              onClick={() => {
                handleClick(item)
              }}
              key={idx}
              className="flex gap-4 rounded-xl shadow-md bg-white p-2 hover:bg-gray-50 transition"
            >
              <img
                src={item.enclosure?.link}
                className="w-40 h-28 rounded-md object-cover"
              />
              <div className="flex flex-col items-start justify-between">
                <h2 className="font-bold text-lg line-clamp-2">{item.title}</h2>
                <p className="text-gray-400 text-sm">{item.categories}</p>
                <h1>Public Day: {item.pubDate}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
