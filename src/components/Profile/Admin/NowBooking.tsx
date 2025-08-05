import axios from "axios";
import { useEffect, useState } from "react";
import type { Movies } from "../../../types/type";



export const NowBooking = () => {
  const [DataMovie,SetDataMovie]=useState<Movies[]>([])
    const FetchData = async () => {
    try {
      const response = await axios.get(
        "https://backendformoviebooking-1.onrender.com/api/Cinema/MovieBooking"
      );
      SetDataMovie(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    FetchData()
  })
  return (
    <div className='mt-10'>
        <h1 className='text-white text-2xl font-bold'>NowBooking</h1>
        <div className=" flex flex-wrap">
            {DataMovie?.map((item,index)=>{
          return(
            <div className="bg-gray-600 p-5 text-white" key={index}>
              <img className="w-50 h-50 rounded-2xl" src={item?.poster} alt="" />
              <h1>{item?.title}</h1>
            </div>
          )
        })}
        </div>
      
    </div>
  )
}
