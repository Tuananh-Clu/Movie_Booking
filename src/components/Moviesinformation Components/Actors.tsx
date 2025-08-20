import { useState, useEffect } from 'react'
import type { Actor } from '../../types/type'
import axios from 'axios'

export const Actors = ({ movieName }: { movieName: string }) => {
  const [actorList, setActorList] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const [id, setId] = useState<number | null>(null);

  const fetchID = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f0ab50cc5acff8fa95bb6bda373e8aa9&language=vi&query=${decodeURIComponent(movieName)}`);
      
      if (response.data.results && response.data.results.length > 0) {
        setId(response.data.results[0].id);
      } else {
        setError('Không tìm thấy phim');
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      setError('Lỗi khi tìm kiếm phim');
    } finally {
      setLoading(false);
    }
  };

  const fetchActor = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f0ab50cc5acff8fa95bb6bda373e8aa9&language=vi-VN`);
      
      setActorList(response.data.cast || []);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu diễn viên:", error);
      setError('Lỗi khi tải danh sách diễn viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieName) {
      fetchID();
    }
  }, [movieName]);

  useEffect(() => {
    if (id) {
      fetchActor();
    }
  }, [id]);

  if (loading) {
    return (
      <div className='mt-20 md:px-30 px-10 flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Your Favourite Cast</h1>
        <div className='text-center'>Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='mt-20 md:px-30 px-10 flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Your Favourite Cast</h1>
        <div className='text-center text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <div className='mt-20 md:px-30 px-10 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold text-white'>Your Favourite Cast</h1>
      <div className='flex flex-wrap gap-4'>
        {actorList.length > 0 ? (
          actorList.slice(0, 9).map((item, index) => (
            <div key={ index} className='flex flex-col gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10'>
              <img 
                className='w-40 h-50 rounded-2xl object-cover' 
                src={item.profile_path ? IMG_PATH + item.profile_path : '/placeholder-actor.jpg'} 
                alt={`${item.name} profile`}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-actor.jpg';
                }}
              />
              <h1 className='text-xs font-bold text-center max-w-[160px] truncate text-white'>{item.name}</h1>
              {item.character && (
                <p className='text-xs text-gray-700 text-center max-w-[160px] truncate'>
                  as {item.character}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className='text-center w-full'>Không có thông tin diễn viên</div>
        )}
      </div>
    </div>
  )
}