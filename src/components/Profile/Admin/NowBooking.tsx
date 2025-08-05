import axios from "axios";
import { useEffect, useState } from "react";



export const NowBooking = () => {
  const [DataMovie,SetDataMovie]=useState<any[]>([])
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
        {DataMovie?.map((item,index)=>{
          return(
            <div key={index}>
              <img src={item?.poster} alt="" />
              <h1>{item?.title}</h1>
            </div>
          )
        })}
    </div>
  )
}
