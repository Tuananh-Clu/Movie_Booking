
import { useState ,useEffect} from 'react'
import type { Actor } from '../../types/type'
import axios from 'axios'


export const Actors = ({movieName}:{movieName:string}) => {
    const [ActorList,setActorList]=useState<Actor[]>();
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
    const [id, setId] = useState<number | null>(null);


   const fetchID = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f0ab50cc5acff8fa95bb6bda373e8aa9&language=vi&query=${decodeURIComponent(movieName)}`);
        setId(response.data.results[0].id);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
 
      }
    };
        const fetchActor = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f0ab50cc5acff8fa95bb6bda373e8aa9&language=vi-VN`);
        setActorList(response.data)
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
 
      }
    };
    useEffect(() => {
      fetchID();
    }, [movieName]);
    useEffect(() => {
      if (id) {
        fetchActor();
      }
    }, [id]);


  return (
    <div className='mt-20 md:px-30 px-10 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold'>Your Favourite Cast</h1>
      <div className='flex md:flex-row flex-wrap  gap-4'>
        {ActorList?.map((item)=>{
          return(
            <div className='flex flex-col gap-3 '>
              <img className='w-40 h-50 rounded-2xl' src={IMG_PATH+item.profile_path} alt="Profile" />
              <h1 className='text-2xs font-bold'>{item.name}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}
