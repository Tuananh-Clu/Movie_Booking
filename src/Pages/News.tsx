import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import type { items } from "../types/type";
import { MainArticle } from "../components/News Components/MainArticle";
import { Footer } from "../components/Footer";
import { AnotherArticle } from "../components/News Components/AnotherArticle";
import axios from "axios";

export const News = () => {
  const [article, setArticle] = useState<items[]>([]);
  const fetchAllMovieNews=async()=>{
    try{
      const response=await axios("https://backendformoviebooking-production.up.railway.app/api/Article/Show")
      setArticle(response.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAllMovieNews()
  }, []);
  useEffect(() => {
    console.log(article);
  }, [article]);

  return (
    <div  className="bg-gradient-to-br from-cyan-200 via-neutral-200 to-pink-300">
      <Navbar />
      <div className="text-black  pt-30 md:px-20 px-10">
        <h1 className="text-3xl text-shadow-2xs mb-5 font-bold">News</h1>
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="md:w-4/7">
            {" "}
            <MainArticle  />
          </div>
          <div className="md:w-3/7 md:mt-0 mt-10">
           <AnotherArticle/>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};
