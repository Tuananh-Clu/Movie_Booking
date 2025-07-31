import { useContext, useEffect, useState } from "react";
import type { items } from "../../types/type";
import { NewContext } from "../../config/new";
import axios from "axios";

export const MainArticle = () => {
  const [article, setArticle] = useState<items[]>([]);
  const {SelectArticle}=useContext(NewContext);
  const firstArticle=article.slice(0,1).map((item)=>item);
  const displayArticle=SelectArticle.enclosure?.link===""?firstArticle:SelectArticle;
const fetchAllMovieNews=async()=>{
    try{
      const response=await axios("https://backendformoviebooking-1.onrender.com/api/Article/Show")
      setArticle(response.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAllMovieNews()
  }, []);
  return (
    <div className="rounded-2xl  ">
      {displayArticle==SelectArticle?SelectArticle.enclosure?.link&& (
          <div className="rounded-2xl flex flex-col items-center" >
            <div className="rounded-2xl bg-cover ">
              <img className="h-[420px] rounded-2xl" src={SelectArticle.enclosure.link} alt="" />
            </div>
            <h1 className="font-bold text-2xl">{SelectArticle.title}</h1>
            <div>
              <h1>Categories:{SelectArticle.categories}</h1>
             <div className="text-2xs mt-10" dangerouslySetInnerHTML={{ __html: SelectArticle.content }} />
            </div>
             <button className="mt-10 bg-red-400 text-white p-3 rounded-2xl"><a href={SelectArticle.link}>Đọc Thêm</a></button>
          </div>
        ): (
          firstArticle.map((item,index)=>{
            return(
               <div key={index} className="rounded-2xl w-full" >
            <div className="rounded-2xl  object-cover ">
              <img className="md:h-[420px] w-full rounded-2xl" src={item.enclosure?.link} alt="" />
            </div>
            <h1 className="font-bold text-2xl">{item.title}</h1>
            <div>
              <h1>Categories:{item.categories}</h1>
             <div className="text-2xs mt-10" dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
             <button className="mt-10 bg-red-400 text-white p-3 rounded-2xl"><a href={item.link}>Đọc Thêm</a></button>
          </div>
            )
          })
        )
      }
     
    </div>
  );
};
