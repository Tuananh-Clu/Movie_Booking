import type { Movies } from '../../../types/type'

type PhimDaXemProps = {
  movies: Movies[]
}

export const PhimDaXem = ({ movies }: PhimDaXemProps) => {
  return (
    <div className="text-white backdrop-blur-3xl rounded-2xl bg-white/5 p-4">
      <h1 className='text-white text-shadow-2xs font-bold text-2xl mb-3'>Phim Đã Xem</h1>
      
      {movies.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className='text-white bg-gray-900/10 shadow-2xs p-3 rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300'
            >
              <img
                className="w-40 h-52 rounded-2xl object-cover"
                src={movie.poster}
                alt={movie.title}
              />
              <h2 className="mt-2 text-center text-sm md:text-base">
                {movie.title.length > 10 ? `${movie.title.slice(0, 10)}...` : movie.title}
              </h2>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-gray-400 text-center mt-6">
          Chưa có phim nào đã xem
        </h2>
      )}
    </div>
  )
}
